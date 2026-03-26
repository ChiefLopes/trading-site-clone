import authConfig from "./auth.config";
import NextAuth from "next-auth";
import type { NextRequest } from "next/server";

const { auth } = NextAuth(authConfig);

export const proxy = auth(async function proxy(req: NextRequest & { auth: any }) {
  const url = req.nextUrl;
  const session = req.auth;

  const isDashboard = url.pathname.startsWith("/dashboard");

  if (!isDashboard) return; // Allow all non-dashboard requests through

  const isLoggedIn = !!session?.user;

  if (!isLoggedIn) {
    return Response.redirect(new URL("/login", url));
  }

  // All other checks (OTP verification, provider-based bypass) are handled
  // in the dashboard layout which has full Node.js + Prisma access.
});

export const config = {
  matcher: ["/((?!api/auth|api|_next/static|_next/image|favicon.ico).*)"],
};
