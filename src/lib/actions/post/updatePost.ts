"use server";
import getCurrentUser from "@/lib/getUser";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import generateSlug from "@/lib/utils/generateSlug";
import { updatePostSchema } from "@/lib/utils/schema";
import { revalidatePath } from "next/cache";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
export async function updatePost(formData: FormData) {
  // check for user auth
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");

  let imageUrl: string | null = null;
  let imageId: string | null = null;
  const image = formData.get("image");
  const data = updatePostSchema.parse({
    id: formData.get("id"),
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    category: formData.get("category"),
    imageId: formData.get("imageId"),
    image: formData.get("image"),
  });
  //   const textFields = Object.fromEntries(formData.entries());
  const { id, title, description, content, category } = data;

  if (image instanceof File && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadImage = await imagekit.upload({
      file: buffer,
      fileName: `${new Date()}-${image.name}`,
    });
    imageUrl = uploadImage.url;
    imageId = uploadImage.fileId;
    try {
      await imagekit.deleteFile(data.imageId);
    } catch (deleteError) {
      console.error("Failed to delete old image from ImageKit:", deleteError);
    }
  }

  // calc readTime
  const wordCount = data.content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);

  const currentPost = await prisma.post.findUnique({ where: { id } });
  if (!currentPost) {
    throw new Error("Post not found");
  }
  const result = await prisma.post.update({
    where: { id: data.id, authorId: user.id },
    data: {
      slug:
        currentPost.title.toLowerCase() === title.toLowerCase()
          ? currentPost.slug
          : await generateSlug(title),
      title,
      description,
      content,
      category,
      readTime,
      // Only updates these fields if a new file was uploaded
      ...(imageId && { imageId }),
      ...(imageUrl && { imageUrl }),
    },
  });

  revalidatePath("/blogs");
  return result;
}
