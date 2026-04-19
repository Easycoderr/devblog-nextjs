"use server";
import { redirect } from "next/navigation";
import getCurrentUser from "../getUser";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";
import generateSlug from "@/app/utils/generateSlug";

const POSTS_PER_PAGE = 8;
// Get all posts
export async function getPosts(page = 1, searchQuery) {
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
  const post = await prisma.post.findUnique({ where: { slug } });
  return post;
}
// Create post server action
async function createPost(formData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  const { title, description, content, category } = formData;
  //  console.log("Loaded Models:", Object.keys(prisma));
  await prisma.post.create({
    data: {
      slug: generateSlug(title),
      title,
      description,
      content,
      category,
      authorId: user.id,
    },
  });
  revalidatePath("/blogs");
}

// Update
export async function updatePost(postData) {
  const { id, title, description, content, category } = postData;
  await prisma.post.update({
    where: { id },
    data: { title, description, content, category },
  });
  revalidatePath("/blogs");
}

// Delete post
export async function deletePost(postId) {
  try {
    await prisma.post.delete({ where: { id: postId } });
    revalidatePath("/blogs");
    return { success: true };
  } catch (error) {
    if (error.code == "P2025") {
      revalidatePath("/blogs");
      return { success: true };
    }
    return { success: false, error: "Database error" };
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
