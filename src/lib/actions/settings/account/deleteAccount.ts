"use server";

import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import signOutUser from "@/lib/actions/auth/signOut";
import { imagekit } from "@/lib/imagekit";

async function deleteAccount(data: { password: string }) {
  const currUser = await getCurrentUser();
  if (!currUser) {
    console.log("No valid user session found.");
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: currUser.id },
    select: { password: true, provider: true },
  });
  if (!user) return null;
  if (!user.password) {
    return {
      error: true,
      message: "Password is not set for this account.",
    };
  }
  const isValid = bcrypt.compare(data.password, user.password);
  if (user?.provider === "credentials") {
    if (!isValid) return { error: true, message: "Invalid password" };
  }
  try {
    await prisma.user.delete({
      where: { id: currUser.id },
    });
    try {
      if (currUser.avatarId) {
        await imagekit.deleteFile(currUser.avatarId);
        if (currUser.avatar) {
          await imagekit.purgeCache(currUser.avatar);
        }
      }
    } catch (deleteError) {
      console.error("Failed to delete old image from ImageKit:", deleteError);
    }

    console.log("User successfully removed.");

    await signOutUser();
  } catch (error) {
    console.error("Database connection failure or logout error:", error);
    return null;
  }
}

export default deleteAccount;
