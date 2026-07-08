"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendVerificationEmail(email, token) {
  const verificationLink = `${process.env.AUTH_URL}/auth/verify-email?token=${token}`;
  try {
    const response = await resend.emails.send({
      from: "DevBlog <onboarding@resend.dev>", // change later
      to: email,
      subject: "Verify your email",
      html: `
      <h2>Welcome to DevBlog!</h2>
      <p>Please verify your email by clicking the button below.</p>

      <a href="${verificationLink}">
      Verify Email
      </a>
      `,
    });

    return response;
  } catch (error) {
    console.error("Critical error while sending verification link:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
