"use server";
import bcrypt from "bcryptjs";
import { prisma } from "../prisma";

async function resetPassword(token: string, newPassword: string) {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!resetToken)
      return {
        success: false,
        message: "Invalid or expired reset password link.",
      };
    if (resetToken.expires < new Date()) {
      await prisma.passwordResetToken.delete({
        where: {
          token,
        },
      });
      return {
        success: false,
        message: "Reset password link has expired. Please request a new one.",
      };
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await prisma.user.update({
      where: { email: resetToken.identifier },
      data: { password: hashedPassword },
    });
    await prisma.passwordResetToken.deleteMany({
      where: { identifier: resetToken.identifier },
    });
    return {
      success: true,
      message: "Password changed successfully, you can now sign in.",
    };
  } catch (error) {
    console.log("Something went wromg while reset passsword, ERROR:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export default resetPassword;
