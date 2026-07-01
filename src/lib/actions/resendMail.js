"use server";
import { prisma } from "../prisma";
import { sendVerificationEmail } from "./mail";
import crypto from "crypto";
async function resendMail(email) {
  try {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) return null;
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
    sendVerificationEmail(email, verificationToken);
    return {
      success: true,
      email,
    };
  } catch (error) {
    console.log("Something went wrong, Error:", error);
  }
}

export default resendMail;
