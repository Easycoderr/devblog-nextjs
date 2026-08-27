"use server";

import { prisma } from "../../prisma";
async function verifyResetPasswordToken(token: string) {
  try {
    const resetToken = await prisma.passwordResetToken.findUnique({
      where: { token },
    });
    if (!resetToken)
      return {
        success: false,
        message: "Invalid or esxpired reset password link.",
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
    return {
      success: true,
      message: "Your reset link is valid. You can now choose a new password.",
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
