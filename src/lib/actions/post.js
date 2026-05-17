"use server";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import generateSlug from "@/lib/utils/generateSlug";
import getCurrentUser from "../getUser";
import { prisma } from "../prisma";
import { cookies } from "next/headers";
import { imagekit } from "../imagekit";

const POSTS_PER_PAGE = 8;
// Get all posts
export async function getPosts(page = 1, searchQuery) {
  const user = await getCurrentUser();
  const { search = "", filter = "all", sort } = searchQuery || {};

  const skip = (page - 1) * POSTS_PER_PAGE;
  const whereClause = {
    title: search ? { contains: search } : undefined,
    // content: search ? { contains: search } : undefined,
    category: filter !== "all" ? filter : undefined,
  };
  const [posts, totalCount] = await prisma.$transaction([
    prisma.post.findMany({
      skip: skip,
      take: POSTS_PER_PAGE,
      where: whereClause,
      orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
      include: {
        ...(user
          ? { savedPosts: { where: { userId: user.id }, select: { id: true } } }
          : {}),
      },
    }),
    prisma.post.count({ where: whereClause }),
  ]);

  return { posts, totalPages: Math.ceil(totalCount / POSTS_PER_PAGE) };
}

// Get post by id
export async function getPost(id) {
  const post = await prisma.post.findUnique({
    where: {
      id,
    },
  });
  return post;
}

// Get post by Slug

export async function getPostBySlug(slug) {
  const user = await getCurrentUser();
  const post = await prisma.post.findUnique({
    where: { slug },
    include: {
      ...(user
        ? { savedPosts: { where: { userId: user?.id }, select: { id: true } } }
        : {}),
    },
  });
  return post;
}

// Create post server action
async function createPost(formData) {
  let imageUrl = null;
  let imageId = null;

  // checking for user auth
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  // get image
  const image = formData.get("image");
  const textFields = Object.fromEntries(formData.entries());
  const { title, description, content, category } = textFields;
  if (image && image.size > 0 && typeof image !== "string") {
    // convert file to binary
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // upload to imagekit
    const uploadImage = await imagekit.upload({
      file: buffer,
      fileName: `${new Date()}-${image.name}`,
    });

    imageUrl = uploadImage.url;
    imageId = uploadImage.fileId;
  }
  await prisma.post.create({
    data: {
      slug: await generateSlug(title),
      title,
      description,
      content,
      category,
      imageUrl,
      imageId,
      author: { connect: { id: user.id } },
    },
  });
  revalidatePath("/blogs");
}

// Update
export async function updatePost(formData) {
  let imageUrl = null;
  let imageId = null;
  // check for user auth
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const userId = user.id;
  const image = formData.get("image");

  const textFields = Object.fromEntries(formData.entries());
  const {
    id,
    imageId: oldImageId,
    title,
    description,
    content,
    category,
  } = textFields;

  if (image && image.size > 0 && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadImage = await imagekit.upload({
      file: buffer,
      fileName: `${new Date()}-${image.name}`,
    });
    imageUrl = uploadImage.url;
    imageId = uploadImage.fileId;
  }

  try {
    await imagekit.deleteFile(oldImageId);
  } catch (deleteError) {
    console.error("Failed to delete old image from ImageKit:", deleteError);
  }

  const currentPost = await prisma.post.findUnique({ where: { id } });
  const result = await prisma.post.update({
    where: { id: id, authorId: userId },
    data: {
      slug:
        currentPost.title.toLowerCase() === title.toLowerCase()
          ? currentPost.slug
          : await generateSlug(title),
      title,
      description,
      content,
      category,
      // Only updates these fields if a new file was uploaded
      ...(imageId && { imageId }),
      ...(imageUrl && { imageUrl }),
    },
  });
  if (result.count === 0) throw new Error("Unauthorized or Post not found");
  revalidatePath("/blogs");
  return result;
}

// Delete post
export async function deletePost(postId, userId) {
  if (!userId) throw new Error("Unauthorized");
  try {
    const result = await prisma.post.deleteMany({
      where: { id: postId, authorId: userId },
    });
    if (result.count === 0)
      return { success: false, error: "Post not found or unauthorized" };
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.error("Delete Error:", error);
    return { success: false, error: "Database error occurred" };
  }
}

// Create Comment
export async function createComment(postId, userId, content, parentId = null) {
  if (!content || content.trim("") === "") {
    throw new Error("Comment content cannot be empty");
  }
  try {
    const comment = await prisma.comment.create({
      data: { content, parentId, userId, postId },
    });
    revalidatePath(`/blogs/${postId}`);
    return { success: true, comment };
  } catch (error) {
    console.error("Error creating comment:", error);
    return { success: false, error: "Failed to post comment" };
  }
}
// fetch comments
export async function getComments(postId) {
  try {
    const comments = await prisma.comment.findMany({
      where: { postId },
      include: {
        user: true,
      },
      orderBy: { createdAt: "desc" },
    });
    return comments;
  } catch (error) {
    console.log("Failed to fetch comments:", error);
    throw new Error("Could not load comments.");
  }
}
// delete comment
export async function deleteComment(commentId, userId) {
  if (!userId) throw new Error("Unauthorized");
  try {
    const result = await prisma.comment.delete({
      where: { id: commentId, userId },
    });
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Failed to delete comment:", error);
    throw new Error("Could not delete comment.");
  }
}
// update Comment
export async function updateComment(commentId, content, userId) {
  if (!userId) throw new Error("Unauthorized");
  try {
    const result = await prisma.comment.update({
      where: { id: commentId, userId },
      data: {
        content,
      },
    });
    revalidatePath("/blogs");
    revalidatePath("/");
    return { success: true };
  } catch (error) {
    console.log("Failed to update comment:", error);
    throw new Error("Could not update comment.");
  }
}
// like post
export async function likePost(postId, userId) {
  const [user, post] = await prisma.$transaction([
    prisma.user.findUnique({ where: { id: userId } }),
    prisma.post.findUnique({
      where: { id: postId },
      include: {
        likes: { where: { userId } },
      },
    }),
  ]);
  if (!user || !post) throw new Error("Something went wrong while like post!");
  if (post.likes[0]?.userId === userId) {
    await prisma.like.delete({
      where: {
        id: post.likes[0].id,
      },
    });
  } else {
    await prisma.like.create({
      data: {
        userId,
        postId,
      },
    });
  }
  revalidatePath("/blogs");
  return { success: "Post liked successfully" };
}

// count likes
export async function getLikesByPostId(postId, currUserId) {
  const post = await prisma.post.findUnique({
    where: { id: postId },
    include: {
      _count: {
        select: { likes: true },
      },
      likes: currUserId
        ? {
            where: { userId: currUserId },
            take: 1,
          }
        : false,
    },
  });
  if (!post) return null;
  const { likes, _count } = post;
  return { _count, userLike: likes && likes.length > 0 ? likes[0] : null };
}
// sharePost
export async function sharePost(postId, userId = null) {
  const cookieStore = await cookies();
  let guestId = null;
  if (!userId) {
    guestId = (await cookieStore).get("guest-id")?.value;
    if (!guestId) {
      guestId = crypto.randomUUID();
      await cookieStore.set("guest-id", guestId, { httpOnly: true });
    }
  }
  try {
    const newShare = await prisma.share.upsert({
      where: userId
        ? { userId_postId: { userId, postId } }
        : { guestId_postId: { guestId, postId } },
      update: {},
      create: {
        postId,
        userId: userId || null,
        guestId: guestId || null,
      },
    });
    revalidatePath("/blogs");
    revalidatePath("/");
    return newShare;
  } catch (error) {
    console.error("Share record failed:", error);
    throw error;
  }
}

export async function getSharesByPostId(postId) {
  try {
    const post = await prisma.post.findUnique({
      where: { id: postId },
      include: { _count: { select: { shares: true } } },
    });
    return post;
  } catch (error) {
    console.log("Get shares by post id Error:", error);
  }
}
// Save post
export async function savePost(post, userId) {
  const { id: postId, slug } = post;

  if (!userId) throw new Error("Unauthorized");

  const existing = await prisma.savedPost.findUnique({
    where: { userId_postId: { userId, postId } },
  });

  try {
    if (existing) {
      await prisma.savedPost.delete({
        where: { userId_postId: { userId, postId } },
      });
    } else {
      await prisma.savedPost.create({
        data: {
          userId,
          postId,
        },
      });
    }
    revalidatePath("/blogs");
    revalidatePath(`/blogs/${slug}`);
  } catch (error) {
    console.error("Save post record failed:", error);
  }
}
// get saved posts
export async function getSavedPostsByPostId(postId, userId) {
  try {
    const { savedPosts } = await prisma.post.findUnique({
      where: { id: postId },
      include: {
        savedPosts: userId
          ? {
              where: { userId },
              take: 1,
            }
          : false,
      },
    });
    return { savedPosts };
  } catch (error) {
    console.log(error);
  }
}
//  just for development
export async function createBulkPosts() {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");

  const postsToCreate = Array.from({ length: 40 }).map((_, i) => ({
    slug: generateSlug(`Sample Post Title ${i + 1}`),
    title: `Sample Post Title ${i + 1}`,
    description: `Short description for post number ${i + 1}`,
    content: `This is the full content for post ${i + 1}.`,
    category: "General",
    authorId: user.id,
  }));

  // Standard way that works on all databases (SQLite, Postgres, etc.)
  await Promise.all(
    postsToCreate.map((post) =>
      prisma.post.create({
        data: post,
      }),
    ),
  );

  redirect("/blogs");
}

// delete all just for development
export async function deleteAllPosts() {
  // const user = await getCurrentUser();
  // if (!user) throw new Error("Not authenticated");

  // Optional: Only delete posts belonging to the logged-in user
  // await prisma.post.deleteMany({
  //   where: {
  //     authorId: user.id,
  //   },
  // });

  // If you want to delete EVERYTHING in the table regardless of user:
  await prisma.post.deleteMany({});

  redirect("/blogs");
}

export default createPost;
