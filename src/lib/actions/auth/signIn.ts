"use server";

import { prisma } from "@/lib/prisma";

import { isRedirectError } from "next/dist/client/components/redirect-error";
import generateVerificationToken from "../tokens/generateVerificationToken";
import { sendVerificationEmail } from "../mail/sendVerificationEmail";
import { signIn } from "@/auth";
import { signInSchema } from "@/lib/utils/schema";

export async function signInUser(formData: FormData) {
  const data = signInSchema.parse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  const { email, password } = data;
  const user = await prisma.user.findUnique({ where: { email } });
  if (user && user.provider === "google") {
    return {
      error: "ERROR-PROVIDER",
      message:
        "This account was created with Google. Please continue with Google.",
    };
  }
  if (user && !user.emailVerified) {
    try {
      await prisma.verificationToken.deleteMany({
        where: { identifier: email },
      });
      const verificationToken = await generateVerificationToken(email);
      const response = await sendVerificationEmail(email, verificationToken);
      if ("error" in response && response.error) {
        console.error(response.error?.message);
        return {
          success: false,
          email,
          error: true,
          message: response.error?.message,
        };
      }

      return {
        success: false,
        error: "NOT-VERIFIED",
        email: email,
      };
    } catch (error) {
      console.error(
        "Samething went wrong while sending email verification, ERROR:",
        error,
      );
      return {
        success: false,
        error: true,
        message: "An unexpected error occurred. Please try again.",
      };
    }
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: "/blogs",
    });
  } catch (error) {
    if (isRedirectError(error)) {
      throw error;
    }

    if (error instanceof Error && "type" in error) {
      if (error.type === "CredentialsSignin") {
        return {
          success: false,
          message: "Invalid email or password.",
        };
      }
    }

    throw error;
  }
}
