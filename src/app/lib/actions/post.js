"use server";
import { redirect } from "next/navigation";
import getCurrentUser from "../getUser";
import { prisma } from "../prisma";
import { revalidatePath } from "next/cache";

// Get all posts
export async function getPosts() {
  const posts = await prisma.post.findMany();
  return posts;
}

// Get post by id
export async function getPost(id) {
  const post = await prisma.post.findUnique({ where: { id } });
  return post;
}

// Create post server action
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

// Update
export async function updatePost(postData) {
  const { id, title, description, content, category } = postData;
  await prisma.post.update({
    where: { id },
    data: { title, description, content, category },
  });
  revalidatePath("/blogs");
  redirect("/blogs");
}

// Delete post
export async function deletePost(postId) {
  await prisma.post.delete({ where: { id: postId } });
  revalidatePath("/blogs");
}
export default createPost;
