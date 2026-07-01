import { NextResponse } from "next/server";

export const authConfig = {
  providers: [],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    authorized({ auth, request }) {
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
