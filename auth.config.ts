import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

// This configuration is "Edge Safe" - it doesn't import Prisma or any Node-only libs.
// We use this in proxy.ts (Next.js 16 edge proxy convention).
export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
      allowDangerousEmailAccountLinking: true,
    }),
  ],
  secret: process.env.AUTH_SECRET ?? process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/login",
  },
} satisfies NextAuthConfig;
