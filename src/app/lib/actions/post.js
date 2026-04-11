"use server";

import { redirect } from "next/navigation";
import getCurrentUser from "../getUser";
import { prisma } from "../prisma";

// get posts
export async function getPosts() {
  const posts = await prisma.post.findMany();
  console.log("POSTS:", posts);
  return posts;
}
// create post server action
async function createPost(formData) {
  const user = await getCurrentUser();
  if (!user) throw new Error("Not authenticated");
  const { title, description, content, category } = formData;
  //   console.log("Loaded Models:", Object.keys(prisma));
  await prisma.post.create({
    data: { title, description, content, category, authorId: user.id },
  });
  redirect("/blogs");
}

export default createPost;
