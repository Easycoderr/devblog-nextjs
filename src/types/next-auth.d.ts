declare module "next-auth" {
  interface Session {
    user: {
      userName: string;
      avatar: string;
      avatarId: string;
    };
  }
  interface User {
    userName: string;
    avatar: string;
    avatarId: string;
  }
}
