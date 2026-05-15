"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";
import { imagekit } from "../imagekit";

export async function registerUser(formData) {
  // 1. Grab the binary file explicitly first
  const profilePicture = formData.get("profilePicture");
  // 2. Convert all text fields into a plain JavaScript object
  const textFields = Object.fromEntries(formData.entries());
  const { firstName, lastName, email, password } = textFields;
  // 3. check if user exists
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  let avatar = null;
  let avatarId = null;
  if (existingUser)
    return { error: "This email is already in use. Please try to Sign in" };
  // 4. hash password
  const hashedpassword = await bcrypt.hash(password, 10);
  if (
    profilePicture &&
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
      firstName,
      lastName,
      email,
      password: hashedpassword,
      name: `${firstName} ${lastName}`,
      avatar: avatar,
      avatarId: avatarId,
    },
  });

  return { success: "Registration successful!" };
}

export async function signInUser(formData) {
  const { email, password } = formData;
  //1. check email exist
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) return { error: "Invalid email or password" };

  // 2. compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return { error: "Invalid email or password" };

  // 3. set userid to cookies and redirect to blogs
  (await cookies()).set("userId", user.id, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  return { success: "Sign in successfully!" };
}

export async function signOutUser() {
  (await cookies()).delete("userId");
  redirect("/");
}
