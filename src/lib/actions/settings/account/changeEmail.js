"use server";

import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import generateChangeEmailToken from "../../tokens/generateChangeEmailToken";
import sendChangeEmail from "../../mail/sendChangeEmail";

async function changeEmail(data) {
  const { email, newEmail, password } = data;
  try {
    console.log(data);
    const currUser = await prisma.user.findUnique({
      where: { email },
      select: { password: true },
    });
    console.log("USER:", currUser);
    if (!currUser) return null;
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
    if (response.error) {
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
