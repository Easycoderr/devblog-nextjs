"use server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
async function generateVerificationToken(email: string) {
  try {
    const token = crypto.randomBytes(32).toString("hex");
    await prisma.verificationToken.create({
      data: {
        identifier: email,
        token: token,
        expires: new Date(Date.now() + 1000 * 60 * 10), // 10 Min
      },
    });
    return token;
  } catch (error) {
    console.log("Something went wrong while generate token, ERROR:", error);
    throw error;
  }
}

export default generateVerificationToken;
