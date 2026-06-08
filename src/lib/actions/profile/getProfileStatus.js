"use server";

import { prisma } from "@/lib/prisma";

export async function getTotalUserPosts(userId) {
  if (!userId) return [];
  try {
    const allPosts = prisma.post.count({ where: { authorId: userId } });
    return allPosts;
  } catch (error) {
    console.log("Can't get number of user posts:", error);
  }
}
export async function getTotalUserLikes(userId) {
  if (!userId) return [];
  try {
    const likes = prisma.like.count({
      where: {
        post: {
          authorId: userId,
        },
      },
    });
    return likes;
  } catch (error) {
    console.log("Can't get total user likes:", error);
  }
}
export async function getTotalUserComments(userId) {
  if (!userId) return [];
  try {
    const comments = prisma.comment.count({
      where: {
        post: {
          authorId: userId,
        },
      },
    });
    return comments;
  } catch (error) {
    console.log("Can't get total user comments:", error);
  }
}
export async function getTotalUserShares(userId) {
  if (!userId) return [];
  try {
    const shares = prisma.comment.count({
      where: {
        post: {
          authorId: userId,
        },
      },
    });
    return shares;
  } catch (error) {
    console.log("Can't get total user shares:", error);
  }
}
