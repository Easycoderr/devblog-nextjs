"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
async function updatePassword(data) {
  const currUser = await getCurrentUser();
  const user = await prisma.user.findUnique({
    where: { id: currUser.id },
    select: { password: true },
  });
  const isValid = await bcrypt.compare(data.currentPassword, user.password);
  if (!isValid) {
    return { error: true, message: "Incorrect password" };
  }
  const hashedpassword = await bcrypt.hash(data.newPassword, 10);
  try {
    const result = await prisma.user.update({
      where: { id: currUser.id },
      data: { password: hashedpassword },
    });
    console.log(result);
    if (result)
      return { error: false, message: "password changed successfully" };
  } catch (error) {
    console.log("Something went wrong while change password:", error);
  }
}

export default updatePassword;
