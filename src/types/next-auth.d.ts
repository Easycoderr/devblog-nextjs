declare module "next-auth" {
  interface Session {
    user: {
      userName: string;
    };
  }
  interface User {
    userName: string;
  }
}
