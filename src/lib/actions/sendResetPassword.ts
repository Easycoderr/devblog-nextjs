"use server";
import { prisma } from "../prisma";
import { sendResetPasswordEmail } from "./mail/sendResetPasswordEmail";
import generateResetPasswordToken from "./tokens/generateResetPasswordToken";

async function sendResetPassword(email: string) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user || user.provider === "google") {
      return {
        success: true,
        message:
          "If an account with this email exists, we've sent a password reset link.",
      };
    }
    await prisma.passwordResetToken.deleteMany({
      where: { identifier: email },
    });
    const resetPasswordToken = await generateResetPasswordToken(email);
    const response = await sendResetPasswordEmail(email, resetPasswordToken);
    if ("error" in response && response.error) {
      console.error(
        "[EMAIL_API_ERROR]",
        response.error.name,
        response.error.message,
      );
      return {
        success: false,
        message:
          "We're having trouble sending emails right now. Please try again later.",
      };
    }
    return {
      email,
      success: true,
      message:
        "If an account with this email exists, we've sent a password reset link.",
    };
  } catch (error) {
    console.log("Samething went wrong, ERROR:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export default sendResetPassword;
