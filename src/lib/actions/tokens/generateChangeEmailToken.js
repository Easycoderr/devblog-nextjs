"use server";
import { prisma } from "@/lib/prisma";
import crypto from "crypto";

async function generateChangeEmailToken(email, newEmail) {
  const token = crypto.randomBytes(32).toString("hex");
  console.log(token);
  try {
    await prisma.emailChangeToken.create({
      data: {
        identifier: email,
        token: token,
        newEmail,
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

export default generateChangeEmailToken;
