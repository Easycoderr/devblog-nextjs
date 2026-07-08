"use server";

import { prisma } from "../prisma";
async function verifyResetPasswordToken(token) {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!resetToken)
      return {
        success: false,
        message: "Invalid or expired reset password link.",
      };
    if (resetToken?.expires < new Date()) {
      await prisma.passwordResetToken.delete({
        where: {
          token: token,
        },
      });
      return {
        success: false,
        message: "Reset password link has expired. Please request a new one.",
      };
    }
    return {
      success: true,
      message:
        "Now you can reset your password, you should make your move before link get expired",
    };
  } catch (error) {
    console.log("Something went wrong while reset password, ERROR:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again later.",
    };
  }
}

export default verifyResetPasswordToken;
