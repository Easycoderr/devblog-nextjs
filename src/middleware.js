import { NextResponse } from "next/server";

export function middleware(request) {
  console.log(request);
  const userId = request.cookies.get("userId")?.value;
  const { pathname } = request.nextUrl;
  // 1. Define which routes need protection
  const isProtectedRoute =
    pathname.startsWith("/blogs/create") || pathname.startsWith("/blogs/edit");
  if (isProtectedRoute && !userId) {
    return NextResponse.redirect(new URL("/auth/signin", request.url));
  }

  if (
    userId &&
    (pathname === "/auth/signin" || pathname === "/auth/register")
  ) {
    return NextResponse.redirect(new URL("/", request.url));
  }
  return NextResponse.next();
}
// Ensure middleware doesn't run on static files or images
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
