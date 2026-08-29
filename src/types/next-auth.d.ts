import { DefaultSession } from "next-auth";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      userName: string;
      avatar: string | null;
      avatarId: string | null;
    } & DefaultSession["user"];
  }
  interface User {
    userName: string;
    avatar: string | null;
    avatarId: string | null;
  }
}
declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    email: string;
    userName: string;
    avatar: string | null;
    avatarId: string | null;
  }
}
