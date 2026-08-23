"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";

type UpdatePassword = {
  currentPassword: string;
  newPassword: string;
};

async function updatePassword(data: UpdatePassword) {
  const currUser = await getCurrentUser();
  if (!currUser) return null;
  const user = await prisma.user.findUnique({
    where: { id: currUser.id },
    select: { password: true },
  });
  if (!user) return null;
  if (!user.password)
    return { error: true, message: "Something went wrong, try again!" };
  const isValid = await bcrypt.compare(data.currentPassword, user.password);
  if (!isValid) {
    return { error: true, message: "Incorrect password" };
  }
  const hashedPassword = await bcrypt.hash(data.newPassword, 10);
  try {
    await prisma.user.update({
      where: { id: currUser.id },
      data: { password: hashedPassword },
    });

    return { error: false, message: "password changed successfully" };
  } catch (error) {
    console.log("Something went wrong while change password:", error);
    return {
      error: true,
      message: "Something went wrong. Please try again.",
    };
  }
}

export default updatePassword;
