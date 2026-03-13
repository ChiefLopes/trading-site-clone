import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";
import { prisma } from "@/lib/prisma";
import authConfig from "@/auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  trustHost: true,
  ...authConfig,
  providers: [
    ...authConfig.providers,
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Authorize runs only on the Node.js server, never in Middleware.
        try {
          const email = credentials?.email?.toString().trim().toLowerCase();
          const password = credentials?.password?.toString();

          if (!email || !password) return null;

          const user = await prisma.user.findUnique({
            where: { email },
          });

          if (!user?.passwordHash) return null;

          const isValid = await bcrypt.compare(password, user.passwordHash);
          if (!isValid) return null;

          return {
            id: user.id,
            email: user.email,
            name: user.name,
            image: user.image,
          };
        } catch (error) {
          console.error("Database connection error during authorization:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, account, user }) {
      if (account && user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.picture = user.image;

        // Non-blocking sync for Google names
        if (account.provider === "google") {
          try {
             // We don't await this if we want speed, or we can await it within a try-catch
             const googleName = (user as any).name;
             if (googleName && (!user.name || user.name.toLowerCase() === "user")) {
               await prisma.user.update({
                 where: { email: user.email! },
                 data: { name: googleName },
               });
             }
          } catch (e) {
            console.error("Soft-failure on Google name sync:", e);
          }
        }
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
        session.user.email = token.email as string;
        session.user.image = token.picture as string;
      }
      return session;
    },
  },
});
