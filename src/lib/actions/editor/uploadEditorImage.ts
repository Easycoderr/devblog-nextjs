"use server";

import { auth } from "@/auth";
import { imagekit } from "@/lib/imagekit";
import uploadImage from "@/lib/imageKit/uploadImage";
import { prisma } from "@/lib/prisma";
import { prism } from "react-syntax-highlighter/dist/esm/styles/prism";

type UploadEditorImageResult =
  | {
      success: true;
      url: string;
      fileId: string;
    }
  | {
      success: false;
      message: string;
    };

export default async function uploadEditorImage(
  formData: FormData,
): Promise<UploadEditorImageResult> {
  let uploadedImage: { url: string; fileId: string } | null = null;

  const session = await auth();
  const user = session?.user;
  if (!user) {
    return {
      success: false,
      message: "Please sign in to upload images.",
    };
  }
  if (!user) {
    return {
      success: false,
      message: "Please sign in to upload images.",
    };
  }
  const image = formData.get("image");
  if (!(image instanceof File) || image.size === 0) {
    return {
      success: false,
      message: "Please select an image.",
    };
  }

  try {
    uploadedImage = await uploadImage(image);
  } catch (error) {
    console.error("Editor image upload failed:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to upload image.",
    };
  }
  try {
    await prisma.editorImage.create({
      data: {
        fileId: uploadedImage.fileId,
        url: uploadedImage.url,
        userId: user.id,
      },
    });
    return {
      success: true,
      url: uploadedImage.url,
      fileId: uploadedImage.fileId,
    };
  } catch (error) {
    console.error("Failed to register editor image:", error);
    try {
      await imagekit.deleteFile(uploadedImage.fileId);
    } catch (cleanupError) {
      console.error(
        "Failed to clean up unregistered ImageKit asset:",
        cleanupError,
      );
    }
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to upload image.",
    };
  }
}
