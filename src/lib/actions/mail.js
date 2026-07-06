import { Resend } from "resend";

export const resend = new Resend(process.env.RESEND_API_KEY);
export async function sendVerificationEmail(email, token) {
  const verificationLink = `${process.env.AUTH_URL}/auth/verify-email?token=${token}`;
  try {
    await resend.emails.send({
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
  } catch (error) {
    console.log(
      "There was an error happend while sending verification link, ERROR:",
      error,
    );
  }
}
