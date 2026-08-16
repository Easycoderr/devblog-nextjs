"use server";
import getCurrentUser from "@/lib/getUser";
import { prisma } from "@/lib/prisma";
import { Prisma } from "@prisma/client";

const POSTS_PER_PAGE = 8;
type PostSearchQueryTypes = {
  search?: string;
  filter?: string;
  sort?: "oldest" | "newest";
};
async function getPosts(page: number = 1, searchQuery?: PostSearchQueryTypes) {
  const user = await getCurrentUser();
  const { search = "", filter = "all", sort } = searchQuery || {};

  const skip = (page - 1) * POSTS_PER_PAGE;
  const whereClause: Prisma.PostWhereInput = {
    title: search ? { contains: search } : undefined,
    // content: search ? { contains: search } : undefined,
    category: filter !== "all" ? filter : undefined,
  };
  const [posts, totalCount] = await prisma.$transaction([
    prisma.post.findMany({
      skip: skip,
      take: POSTS_PER_PAGE,
      where: whereClause,
      orderBy: { createdAt: sort === "oldest" ? "asc" : "desc" },
      include: {
        ...(user
          ? { savedPosts: { where: { userId: user.id }, select: { id: true } } }
          : {}),
        _count: {
          select: { viewLog: true },
        },
      },
    }),
    prisma.post.count({ where: whereClause }),
  ]);

  return { posts, totalPages: Math.ceil(totalCount / POSTS_PER_PAGE) };
}

export default getPosts;
