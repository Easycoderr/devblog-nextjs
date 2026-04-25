"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerUser(formData) {
  const { firstName, lastName, email, password } = formData;
  // 1. check if user exists

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser)
    return { error: "This email is already in use. Please try to Sign in" };
  // 2. hash password

  const hashedpassword = await bcrypt.hash(password, 10);

  // 3. create user

  await prisma.user.create({
    data: {
      firstName,
      lastName,
      email,
      password: hashedpassword,
      name: `${firstName} ${lastName}`,
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
