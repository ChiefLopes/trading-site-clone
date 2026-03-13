import NextAuth from "next-auth";
import authConfig from "@/auth.config";

// Next.js 16+ "proxy" convention
const { auth: proxyHandler } = NextAuth(authConfig);

// Exporting as a named function called 'proxy' to satisfy Next.js compiler
export const proxy = proxyHandler;

// Also providing as default for maximum compatibility
export default proxyHandler;

export const config = {
  // Matching everything except static files and api routes that don't need auth
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
