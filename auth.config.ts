import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// This configuration is "Edge Safe" - it doesn't import Prisma or any Node-only libs.
// We use this in Middleware to keep things fast and compatible with Edge Runtime.
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isDashboard = nextUrl.pathname.startsWith("/dashboard");
      
      if (isDashboard) {
        if (isLoggedIn) return true;
        return false; // Redirect to login
      }
      return true;
    },
  },
} satisfies NextAuthConfig;
