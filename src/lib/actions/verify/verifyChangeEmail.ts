"use server";
import { prisma } from "@/lib/prisma";

async function verifyChangeEmail(token: string) {
  try {
    const changeToken = await prisma.emailChangeToken.findUnique({
      where: { token: token },
    });
    if (!changeToken)
      return {
        success: false,
        message: "Invalid or expired reset password link.",
      };
    if (changeToken.expires < new Date()) {
      await prisma.emailChangeToken.delete({
        where: {
          token: token,
        },
      });
      return {
        success: false,
        message: "Reset password link has expired. Please request a new one.",
      };
    }
    const user = await prisma.user.update({
      where: { email: changeToken.identifier },
      data: { email: changeToken.newEmail, emailVerified: new Date() },
    });
    await prisma.emailChangeToken.delete({
      where: {
        token: token,
      },
    });

    return {
      newEmail: user.email,
      success: true,
      message: "Your email changed successfully",
    };
  } catch (error) {
    console.log("Something went wrong while Change email, ERROR:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export default verifyChangeEmail;
