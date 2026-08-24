"use server";
import getCurrentUser from "@/lib/getUser";
import { imagekit } from "@/lib/imagekit";
import { prisma } from "@/lib/prisma";
import { updateProfileSchema } from "@/lib/utils/schema";
import { revalidatePath } from "next/cache";

async function updateUserProfile(formData: FormData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Unauthorized");
  let avatarUrl: string | null = null;
  let avatarId: string | null = null;
  const image = formData.get("profilePicture");

  const data = updateProfileSchema.parse({
    avatarId: formData.get("avatarId"),
    bio: formData.get("bio"),
    userName: formData.get("userName"),
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
  });
  const { avatarId: oldAvatarId, firstName, lastName, userName, bio } = data;

  if (image instanceof File && image.size > 0) {
    const bytes = await image.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadImage = await imagekit.upload({
      file: buffer,
      fileName: `${new Date()}-${image.name}`,
    });
    avatarUrl = uploadImage.url;
    avatarId = uploadImage.fileId;
    if (oldAvatarId) {
      try {
        await imagekit.deleteFile(oldAvatarId);
      } catch (deleteError) {
        console.error("Failed to delete old image from ImageKit:", deleteError);
      }
    }
  }
  try {
    await prisma.user.update({
      where: { id: user.id },
      data: {
        firstName,
        lastName,
        name: `${firstName} ${lastName}`,
        ...(user.userName !== userName && { userName }),
        bio,
        ...(avatarUrl && { avatar: avatarUrl }),
        ...(avatarId && { avatarId }),
      },
    });
    revalidatePath("/");
    return {
      success: true,
      message: "Profile updated successfully.",
    };
  } catch (error) {
    console.log("Failed to update profile please try again.", error);
    return {
      success: false,
      message: "Failed to update profile. Please try again.",
    };
  }
}

export default updateUserProfile;
