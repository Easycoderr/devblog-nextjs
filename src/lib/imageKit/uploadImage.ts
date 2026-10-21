"server-only";

import { imagekit } from "../imagekit";
const MAX_FILE_SIZE = 4 * 1024 * 1024;
type UploadImageResult = {
  url: string;
  fileId: string;
};

async function uploadImage(image: File): Promise<UploadImageResult> {
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
  const uploadedImage = await imagekit.upload({
    file: buffer,
    fileName: `${Date.now()}-${image.name}`,
  });
  return {
    url: uploadedImage.url,
    fileId: uploadedImage.fileId,
  };
}

export default uploadImage;
