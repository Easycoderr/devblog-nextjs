"use server";
import { prisma } from "../prisma";
import { sendVerificationEmail } from "./mail";
import crypto from "crypto";
async function resendMail(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
    if (user.emailVerified)
      return {
        success: false,
        message: "Email already verified you can now",
      };
    await prisma.verificationToken.deleteMany({
      where: { identifier: email },
    });
    const verificationToken = crypto.randomBytes(32).toString("hex");
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: verificationToken,
        expires: new Date(Date.now() + 1000 * 60 * 60 * 24), // 24 hours
      },
    });
    await sendVerificationEmail(email, verificationToken);
    return {
      success: true,
      email,
    };
  } catch (error) {
    console.log("Something went wrong, Error:", error);
  }
}

export default resendMail;
