"use server";
import getCurrentUser from "@/lib/getUser";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import extractTiptapImages from "@/lib/utils/extractTiptapImages";
import extractTiptapText from "@/lib/utils/extractTiptapText";
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
  const parsedContent = JSON.parse(content);
  const text = extractTiptapText(parsedContent);
  const trimmedText = text.trim();
  const wordCount = trimmedText ? trimmedText.split(/\s+/).length : 0;
  const readTime = Math.ceil(wordCount / 200);

  const currentPost = await prisma.post.findFirst({
    where: {
      id,
      authorId: user.id,
    },
  });

  if (!currentPost) {
    throw new Error("Post not found");
  }
  if (image instanceof File && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);
    const uploadImage = await imagekit.upload({
      file: buffer,
      fileName: `${new Date()}-${image.name}`,
    });
    imageUrl = uploadImage.url;
    imageId = uploadImage.fileId;
    // try {
    //   await imagekit.deleteFile(data.imageId);
    // } catch (deleteError) {
    //   console.error("Failed to delete old image from ImageKit:", deleteError);
    // }
  }

  const response = await prisma.post
    .update({
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
        ...(imageId && { imageId }),
        ...(imageUrl && { imageUrl }),
      },
    })
    .catch(async (error: unknown) => {
      // Only clean up the new cover uploaded by this request.
      if (imageId) {
        try {
          await imagekit.deleteFile(imageId);
        } catch (cleanupError) {
          console.error(
            "Failed to clean up newly uploaded cover after post update failed:",
            cleanupError,
          );
        }
      }

      // Preserve the original database error.
      throw error;
    });
  // Detect removed inline images without deleting them yet.

  // Track unused inline images. Do not delete ImageKit files yet.
  const previousImages = extractTiptapImages(currentPost.content);
  const updatedImages = extractTiptapImages(content);
  if (previousImages && updatedImages) {
    const removedImageIds = [...previousImages.keys()].filter(
      (fileId) => !updatedImages.has(fileId),
    );

    // If an image is present again, cancel its pending cleanup.
    const activeImageIds = [...updatedImages.keys()];

    if (activeImageIds.length > 0) {
      const resetResult = await prisma.editorImage.updateMany({
        where: {
          userId: user.id,
          fileId: { in: activeImageIds },
          unusedAt: { not: null },
        },
        data: { unusedAt: null },
      });
    }

    if (removedImageIds.length > 0) {
      const ownedImages = await prisma.editorImage.findMany({
        where: {
          userId: user.id,
          fileId: { in: removedImageIds },
        },
        select: { fileId: true },
      });

      const ownedFileIds = ownedImages.map((image) => image.fileId);
      const markedUnusedIds: string[] = [];
      const stillReferencedIds: string[] = [];

      for (const fileId of ownedFileIds) {
        // Search all posts for inline or cover-image references.
        const existingReference = await prisma.post.findFirst({
          where: {
            OR: [{ imageId: fileId }, { content: { contains: fileId } }],
          },
          select: { id: true },
        });

        if (existingReference) {
          stillReferencedIds.push(fileId);

          // A referenced image must not remain pending for cleanup.
          await prisma.editorImage.updateMany({
            where: {
              userId: user.id,
              fileId,
              unusedAt: { not: null },
            },
            data: { unusedAt: null },
          });

          continue;
        }

        // Start the grace period only once; don't extend it on every save.
        const result = await prisma.editorImage.updateMany({
          where: {
            userId: user.id,
            fileId,
            unusedAt: null,
          },
          data: { unusedAt: new Date() },
        });

        if (result.count > 0) {
          markedUnusedIds.push(fileId);
        }
      }

      removedImageIds.filter((fileId) => !ownedFileIds.includes(fileId));
    }
  }

  revalidatePath("/blogs");
  return response;
}
