"use server";
import { prisma } from "../prisma";
import { sendResetPasswordEmail } from "./mail/sendResetPasswordEmail";
import { sendVerificationEmail } from "./mail/sendVerificationEmail";
import generateResetPasswordToken from "./tokens/generateResetPasswordToken";
import generateVerificationToken from "./tokens/generateVerificationToken";
async function resendMail(email, mode) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    if (user.emailVerified && mode === "verify") {
      return {
        success: "VERIFIED",
        message: "Email already verified you can now",
      };
    }

    if (mode === "verify") {
      await prisma.verificationToken.deleteMany({
        where: { identifier: email },
      });
      const verificationToken = await generateVerificationToken(email);
      const response = await sendVerificationEmail(email, verificationToken);
      if (!response.error) {
        return {
          success: true,
          email,
        };
      }
      console.error(response.error?.message);
      return {
        success: false,
        email,
        error: true,
        message: response.error?.message,
      };
    } else {
      await prisma.passwordResetToken.deleteMany({
        where: { identifier: email },
      });
      const resetPasswordToken = await generateResetPasswordToken(email);
      const response = await sendResetPasswordEmail(email, resetPasswordToken);
      if (!response.error) {
        return {
          success: true,
          email,
        };
      }
      console.error(response.error?.message);
      return {
        success: false,
        email,
        error: true,
        message: response.error?.message,
      };
    }
  } catch (error) {
    console.log("Something went wrong, Error:", error);
    return {
      error: true,
      message: "Failed to send email. Please try again.",
    };
  }
}

export default resendMail;
