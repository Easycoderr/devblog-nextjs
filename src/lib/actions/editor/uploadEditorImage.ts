"use server";

import uploadImage from "@/lib/imageKit/uploadImage";

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
  try {
    const image = formData.get("image");

    if (!(image instanceof File) || image.size === 0) {
      return {
        success: false,
        message: "Please select an image.",
      };
    }

    const uploadedImage = await uploadImage(image);

    return {
      success: true,
      url: uploadedImage.url,
      fileId: uploadedImage.fileId,
    };
  } catch (error) {
    console.error("Editor image upload failed:", error);

    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Failed to upload image.",
    };
  }
}
