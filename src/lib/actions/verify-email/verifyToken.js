"use server";
import { prisma } from "@/lib/prisma";
import { redirect } from "next/navigation";
async function verifyToken(token) {
  try {
    const verificationToken = await prisma.verificationToken.findUnique({
      where: { token },
    });
    if (!verificationToken)
      return {
        success: false,
        message: "Invalid or expired verification link.",
      };
    if (verificationToken.expires < new Date()) {
      await deleteToken(verificationToken.token);
      return {
        success: false,
        message: "Verification link has expired.",
      };
    }
    await prisma.user.update({
      where: {
        email: verificationToken.identifier,
      },
      data: {
        emailVerified: new Date(),
      },
    });
    await deleteToken(verificationToken.token);
  } catch (error) {
    console.log("There is an error happend while verify email! ERROR:", error);
    return {
      success: false,
      message: "Something went wrong.",
    };
  }
  return redirect("/auth/signin/?verified=true");
}
async function deleteToken(verificationToken) {
  await prisma.verificationToken.delete({
    where: {
      token: verificationToken,
    },
  });
}
export default verifyToken;
