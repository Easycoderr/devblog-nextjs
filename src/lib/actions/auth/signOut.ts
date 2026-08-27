"use server";

import { signOut } from "@/auth";
import { redirect } from "next/navigation";

async function signOutUser() {
  await signOut();
  redirect("/");
}
export default signOutUser;
