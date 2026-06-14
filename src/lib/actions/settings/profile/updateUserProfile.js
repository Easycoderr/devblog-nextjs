"use server";
import getCurrentUser from "@/lib/getUser";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import { upload } from "@imagekit/next";

async function updateUserProfile(formData) {
  let avatarUrl = null;
  let avatarId = null;
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  const image = formData.get("profilePicture");
  const textFields = Object.fromEntries(formData.entries());
  const {
    avatarId: oldAvatarId,
    firstName,
    lastName,
    userName,
    bio,
  } = textFields;
  if (image && image.size > 0 && typeof image !== "string") {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadImage = await imagekit.upload({
      file: buffer,
      fileName: `${new Date()}-${image.name}`,
    });
    avatarUrl = uploadImage.url;
    avatarId = uploadImage.fileId;

    try {
      console.log(oldAvatarId);
      await imagekit.deleteFile(oldAvatarId);
    } catch (deleteError) {
      console.error("Failed to delete old image from ImageKit:", deleteError);
    }
  }
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
        ...(user.userName !== userName && { userName }),
        bio,
        ...(avatarUrl && { avatar: avatarUrl }),
        ...(avatarId && { avatarId }),
      },
    });
  } catch (error) {
    console.log("Failed to update profile please try again.", error);
  }
}

export default updateUserProfile;
