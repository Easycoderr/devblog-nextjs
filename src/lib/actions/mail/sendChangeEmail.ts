"use server";
import { Resend } from "resend";
const resend = new Resend(process.env.RESEND_API_KEY!);
async function sendChangeEmail(email: string, token: string) {
  const verificationLink = `${process.env.AUTH_URL!}/auth/change-email?token=${token}`;
  try {
    const response = await resend.emails.send({
      from: "DevBlog <onboarding@resend.dev>", // change later
      to: email,
      subject: "Change email",
      html: `
      <h2>Welcome to DevBlog</h2>
      <p>Change your email by clicking the button below.</p>

      <a href="${verificationLink}">
      Change email
      </a>
      `,
    });

    return response;
  } catch (error) {
    console.error("Critical error while sending Change email link:", error);
    return { success: false, message: "An unexpected error occurred." };
  }
}

export default sendChangeEmail;
