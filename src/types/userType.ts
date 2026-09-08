import { Prisma } from "@prisma/client";

export type UserType = Prisma.UserGetPayload<{
  select: {
    id: true;
    firstName: true;
    lastName: true;
    provider: true;
    avatar: true;
    avatarId: true;
    bio: true;
  };
}> | null;
