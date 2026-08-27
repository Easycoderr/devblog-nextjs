"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);
export async function sendResetPasswordEmail(email: string, token: string) {
  const verificationLink = `${process.env.AUTH_URL!}/auth/reset-password?token=${token}`;
  try {
    const response = await resend.emails.send({
      from: "DevBlog <onboarding@resend.dev>", // change later
      to: email,
      subject: "Reset password",
      html: `
      <h2>Welcome back to DevBlog!</h2>
      <p>Reset your password by clicking the button below.</p>

      <a href="${verificationLink}">
      Reset password
      </a>
      `,
    });

    return response;
  } catch (error) {
    console.error("Critical error while sending verification link:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}
