import { NextRequest, NextResponse } from "next/server";
import Google from "next-auth/providers/google";
import { Session } from "next-auth";
export const authConfig = {
  providers: [
    Google({
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({
      auth,
      request,
    }: {
      auth: Session | null;
      request: NextRequest;
    }) {
      const { pathname } = request.nextUrl;
      const isLoggedIn = !!auth?.user;
      const isProtectedRoute =
        pathname.startsWith("/blogs/create") ||
        pathname.startsWith("/blogs/edit") ||
        pathname.startsWith("/settings/profile") ||
        pathname.startsWith("/settings/account") ||
        pathname.startsWith("/settings/security");
      // route protection logic
      if (isProtectedRoute && !isLoggedIn) {
        return false;
      }

      if (
        isLoggedIn &&
        (pathname === "/auth/signin" || pathname === "/auth/register")
      ) {
        return NextResponse.redirect(new URL("/", request.url));
      }
      return true;
    },
  },
};
