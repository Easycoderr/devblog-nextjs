import { cookies } from "next/headers";
import { prisma } from "./prisma";

async function getCurrentUser() {
  const cookieStore = await cookies();
  const userId = cookieStore?.get("userId")?.value;

  if (!userId) return null;
  const user = await prisma.user.findUnique({ where: { id: userId } });

  return user;
}

export default getCurrentUser;
