"use server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";
async function generateResetPasswordToken(email) {
  const token = crypto.randomBytes(32).toString("hex");
  try {
    await prisma.passwordResetToken.create({
      data: {
        identifier: email,
        token: token,
        expires: new Date(Date.now() + 1000 * 60 * 10), // 10 Min
      },
    });
    return token;
  } catch (error) {
    console.log(
      "Something went wrong while generate reset password token, ERROR:",
      error,
    );
  }
}

export default generateResetPasswordToken;
