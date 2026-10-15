import { imagekit } from "../imagekit";

async function deleteImage(imageId: string) {
  if (!imageId) return;
  try {
    await imagekit.deleteFile(imageId);
  } catch (error) {
    console.error("Failed to delete old image from ImageKit:", error);
  }
}

export default deleteImage;
