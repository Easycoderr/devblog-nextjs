import { auth } from "@/auth";
import { updateSessionActivity } from "./lib/actions/auth/update-session";

export default auth(async (req) => {
  const sessionToken =
    req.cookies.get("authjs.session-token")?.value ??
    req.cookies.get("__Secure-authjs.session-token")?.value;
  if (sessionToken) {
    const userAgent = req.headers.get("user-agent");
    const forwardedFor = req.headers.get("x-forwarded-for");
    const ipAddress =
      forwardedFor?.split(",")[0]?.trim() ?? req.headers.get("x-real-ip");

    await updateSessionActivity(sessionToken, userAgent, ipAddress);
  }
});
export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
