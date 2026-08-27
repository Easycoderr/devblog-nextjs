"use server";
import { redirect } from "next/navigation";
import { prisma } from "../prisma";
import bcrypt from "bcryptjs";
import { imagekit } from "../imagekit";
import { signIn, signOut } from "@/auth";
import { sendVerificationEmail } from "./mail/sendVerificationEmail";
import generateVerificationToken from "./tokens/generateVerificationToken";
import { AuthError } from "next-auth";
import { isRedirectError } from "next/dist/client/components/redirect-error";

// export async function registerUser(formData) {
//   // 1. Grab the binary file explicitly first
//   const profilePicture = formData.get("profilePicture");
//   // 2. Convert all text fields into a plain JavaScript object
//   const textFields = Object.fromEntries(formData.entries());
//   const { firstName, lastName, email, password } = textFields;
//   const fName = firstName.toLowerCase();
//   const lName = lastName.toLowerCase();
//   const fullName = `${fName} ${lName}`;
//   // 3. check if user exists
//   const existingUser = await prisma.user.findUnique({
//     where: { email },
//   });
//   let avatar = null;
//   let avatarId = null;
//   if (existingUser?.provider === "google") {
//     return {
//       error: true,
//       success: false,
//       message:
//         "This email is already registered with Google. Please continue with Google.",
//     };
//   }
//   if (existingUser) {
//     return {
//       error: true,
//       success: false,
//       message:
//         "Unable to create account, Please check your information or sign in if you already have an account.",
//     };
//   }
//   // 4. hash password
//   const hashedpassword = await bcrypt.hash(password, 10);
//   if (
//     profilePicture &&
//     profilePicture.size > 0 &&
//     typeof profilePicture !== "string"
//   ) {
//     // 5. convert image file to buffer
//     const bytes = await profilePicture.arrayBuffer();
//     const buffer = Buffer.from(bytes);
//     // 6. Upload to imagekit
//     const uploadedImage = await imagekit.upload({
//       file: buffer,
//       fileName: `${Date.now()}-${profilePicture.name}`,
//     });
//     avatar = uploadedImage.url;
//     avatarId = uploadedImage.fileId;
//   }

//   // 7. create user
//   await prisma.user.create({
//     data: {
//       firstName: fName,
//       lastName: lName,
//       userName: await generateUserName(fullName),
//       email,
//       password: hashedpassword,
//       name: fullName,
//       avatar: avatar,
//       avatarId: avatarId,
//       provider: "credentials",
//     },
//   });
//   // generate verification token
//   const verificationToken = await generateVerificationToken(email);
//   const response = await sendVerificationEmail(email, verificationToken);
//   if (response.error) {
//     console.error(response.error?.message);
//     return {
//       success: false,
//       email,
//       error: true,
//       message: response.error?.message,
//     };
//   }
//   return {
//     success: true,
//     email,
//     error: false,
//   };
// }

// export async function signInUser(formData) {
//   const { email, password } = formData;
//   const user = await prisma.user.findUnique({ where: { email } });
//   if (user?.provider === "google") {
//     return {
//       error: "ERROR-PROVIDER",
//       message:
//         "This account was created with Google. Please continue with Google.",
//     };
//   }
//   if (user && !user?.emailVerified) {
//     try {
//       await prisma.verificationToken.deleteMany({
//         where: { identifier: email },
//       });
//       const verificationToken = await generateVerificationToken(email);
//       const response = await sendVerificationEmail(email, verificationToken);
//       if (response.error) {
//         console.error(response.error?.message);
//         return {
//           success: false,
//           email,
//           error: true,
//           message: response.error?.message,
//         };
//       }

//       return {
//         success: false,
//         error: "NOT-VERIFIED",
//         email: email,
//       };
//     } catch (error) {
//       console.error(
//         "Samething went wrong while sending email verification, ERROR:",
//         error,
//       );
//       return {
//         success: false,
//         error: true,
//         message: "An unexpected error occurred. Please try again.",
//       };
//     }
//   }
//   try {
//     await signIn("credentials", {
//       email,
//       password,
//       redirectTo: "/blogs",
//     });
//   } catch (error) {
//     if (isRedirectError(error)) {
//       throw error;
//     }

//     if (error instanceof AuthError) {
//       if (error.type === "CredentialsSignin") {
//         return {
//           success: false,
//           message: "Invalid email or password.",
//         };
//       }
//     }

//     throw error;
//   }
// }
export async function generateUserName(name) {
  let count = 1;
  let newUserName = name
    .trim()
    .toLowerCase()
    .replace(/ /g, "")
    .replace(/[^\w-]+/g, "");

  while (await getUserByUserName(newUserName)) {
    newUserName = `${newUserName}${count}`;
    count++;
  }

  return newUserName;
}
export async function getUserByUserName(userName) {
  if (!userName) return null;
  const user = await prisma.user.findUnique({ where: { userName } });
  return user;
}
export async function signOutUser() {
  await signOut();
  redirect("/");
}
