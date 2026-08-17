"use server";
import getCurrentUser from "@/lib/getUser";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import generateSlug from "@/lib/utils/generateSlug";
import { createPostSchema } from "@/lib/utils/schema";
import { revalidatePath } from "next/cache";

const MAX_FILE_SIZE = 4 * 1024 * 1024;

export async function createPost(formData: FormData): Promise<void> {
  // checking for user auth
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  const data = createPostSchema.parse({
    title: formData.get("title"),
    description: formData.get("description"),
    content: formData.get("content"),
    category: formData.get("category"),
    image: formData.get("image"),
  });
  const image = formData.get("image");
  let imageUrl: string | null = null;
  let imageId: string | null = null;

  if (!(image instanceof File) || image.size === 0) {
    throw new Error("Image is required.");
  }

  if (image.size > MAX_FILE_SIZE) {
    throw new Error("Max image size is 4MB.");
  }

  //* upload image
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

  // calc readTime
  const wordCount = data.content.trim().split(/\s+/).length;
  const readTime = Math.ceil(wordCount / 200);
  await prisma.post.create({
    data: {
      slug: await generateSlug(data.title),
      title: data.title,
      description: data.description,
      content: data.content,
      category: data.category,
      imageUrl,
      imageId,
      readTime,
      author: {
        connect: {
          id: user.id,
        },
      },
    },
  });
  revalidatePath("/blogs");
}
