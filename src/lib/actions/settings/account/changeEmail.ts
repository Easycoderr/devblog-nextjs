"use server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import generateChangeEmailToken from "../../tokens/generateChangeEmailToken";
import sendChangeEmail from "../../mail/sendChangeEmail";
import { Prisma } from "@prisma/client";
type ChangeEmailTypes = {
  email: string;
  newEmail: string;
  password: string;
};
async function changeEmail(data: ChangeEmailTypes) {
  const { email, newEmail, password } = data;
  try {
    const currUser = await prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });
    if (!currUser) return null;
    if (!currUser.password) {
      return {
        error: "NO-PASSWORD",
        message: "This account does not use a password.",
      };
    }
    const isUserExist = await prisma.user.findUnique({
      where: { email: newEmail },
    });

    if (isUserExist)
      return {
        error: "DUPLICATE-EMAIL",
        message: "This email is already in use.",
      };
    // compare pssawords
    const isMutch = await bcrypt.compare(password, currUser.password);
    if (!isMutch)
      return {
        error: "INVALID-PASS",
        message: "Incorrect password.",
      };
    await prisma.emailChangeToken.deleteMany({
      where: { identifier: email },
    });
    const changeEmailToken = await generateChangeEmailToken(email, newEmail);
    const response = await sendChangeEmail(email, changeEmailToken);
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
      email: email,
      success: true,
      message: "Please check your inbox to verify your new email.",
    };
  } catch (error) {
    console.log("Samething went wrong, ERROR:", error);
    return {
      success: false,
      message: "An unexpected error occurred. Please try again.",
    };
  }
}

export default changeEmail;
