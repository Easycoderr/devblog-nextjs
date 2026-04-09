"use server";

import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
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
