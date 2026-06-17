"use server";

import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { signOutUser } from "../../auth";
import { imagekit } from "@/lib/imagekit";

async function deleteAccount(data) {
  const currUser = await getCurrentUser();
  console.log(currUser);
  if (!currUser || !currUser.id) {
    console.log("No valid user session found.");
    return null;
  }
  const user = await prisma.user.findUnique({
    where: { id: currUser.id },
    select: { password: true },
  });
  const isValid = await bcrypt.compare(data.password, user.password);
  if (!isValid) return { error: true, message: "Invalid password" };
  try {
    const deleteUser = await prisma.user.deleteMany({
      where: { id: currUser.id },
    });
    try {
      if (currUser?.avatarId) {
        await imagekit.deleteFile(currUser.avatarId);
        await imagekit.purgeCache(currUser.avatar);
      }
    } catch (deleteError) {
      console.error("Failed to delete old image from ImageKit:", deleteError);
    }
    if (deleteUser.count === 0) {
      return { error: true, message: "User already deleted or not found." };
    } else {
      console.log("User successfully removed.");
    }
    await signOutUser();
  } catch (error) {
    console.error("Database connection failure or logout error:", error);
    return null;
  }
}

export default deleteAccount;
