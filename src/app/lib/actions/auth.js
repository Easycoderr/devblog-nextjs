"use server";

import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { cookies } from "next/headers";

export async function registerUser(formData) {
  const { firstName, lastName, email, password } = formData;
  console.log(formData);

  //   const name = formData.get("name");
  //   const email = formData.get("email");
  //   const password = formData.get("password");

  // 1. check if user exists

  const existingUser = await prisma.user.findUnique({
    where: { email },
  });

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

  return { success: true };
}

export async function signInUser(formData) {
  const { email, password } = formData;
  //1. check email exist
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw new Error("Invalid email or password");

  // 2. compare passwords
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) throw new Error("Invalid email or password");
  // 3. set userid to cookies and redirect to blogs
  (await cookies()).set("userId", user.id, {
    httpOnly: true,
    secure: true,
    path: "/",
  });
  redirect("/blogs");
}

export async function signOutUser() {
  (await cookies()).delete("userId");
  redirect("/");
}
