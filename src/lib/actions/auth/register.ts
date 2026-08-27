"use server";

import { prisma } from "@/lib/prisma";
import { sendVerificationEmail } from "../mail/sendVerificationEmail";
import generateVerificationToken from "../tokens/generateVerificationToken";
import { generateUserName } from "@/lib/actions/auth/generaetUserName";
import { imagekit } from "@/lib/imagekit";
import bcrypt from "bcryptjs";
import { registerUserSchema } from "@/lib/utils/schema";

async function registerUser(formData: FormData) {
  // 1. Grab the binary file explicitly first
  const data = registerUserSchema.parse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    password: formData.get("password"),
  });
  const profilePicture = formData.get("profilePicture");
  let avatar: string | null = null;
  let avatarId: string | null = null;
  const { firstName, lastName, email, password } = data;
  const fName = firstName.toLowerCase();
  const lName = lastName.toLowerCase();
  const fullName = `${fName} ${lName}`;
  // 3. check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

  if (existingUser?.provider === "google") {
    return {
      error: true,
      success: false,
      message:
        "This email is already registered with Google. Please continue with Google.",
    };
  }
  if (existingUser) {
    return {
      error: true,
      success: false,
      message:
        "Unable to create account, Please check your information or sign in if you already have an account.",
    };
  }
  // 4. hash password
  const hashedpassword = await bcrypt.hash(password, 10);
  if (
    profilePicture instanceof File &&
    profilePicture.size > 0 &&
    typeof profilePicture !== "string"
  ) {
    // 5. convert image file to buffer
    const bytes = await profilePicture.arrayBuffer();
    const buffer = Buffer.from(bytes);
    // 6. Upload to imagekit
    const uploadedImage = await imagekit.upload({
      file: buffer,
      fileName: `${Date.now()}-${profilePicture.name}`,
    });
    avatar = uploadedImage.url;
    avatarId = uploadedImage.fileId;
  }

  // 7. create user
  await prisma.user.create({
    data: {
      firstName: fName,
      lastName: lName,
      userName: await generateUserName(fullName),
      email,
      password: hashedpassword,
      name: fullName,
      avatar: avatar,
      avatarId: avatarId,
      provider: "credentials",
    },
  });
  // generate verification token
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
    success: true,
    email,
    error: false,
  };
}
export default registerUser;
