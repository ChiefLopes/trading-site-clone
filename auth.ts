import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";

export const { handlers, auth, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({ token, account, profile, user: adapterUser }) {
      // On sign-in, 'adapterUser' (from Prisma) or 'profile' (from Google) are available
      if (account && profile && account.provider === "google") {
        const googleName = 
          profile.name || 
          (profile as any).given_name ? 
          `${(profile as any).given_name} ${(profile as any).family_name || ""}`.trim() : 
          null;

        const email = profile.email || token.email;

        if (email && googleName) {
          // Check if current name is missing or the placeholder "user"
          const currentName = adapterUser?.name || token.name || "";
          if (!currentName || currentName.toLowerCase() === "user") {
            token.name = googleName;
            await prisma.user.update({
              where: { email },
              data: { name: googleName },
            });
          }
        }
      }

      const email = token.email?.toString();
      if (!email) return token;

      // Ensure we have the latest data from DB for the token
      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { name: true, email: true, image: true },
      });

      if (dbUser) {
        token.name = dbUser.name ?? token.name;
        token.email = dbUser.email ?? token.email;
        token.picture = dbUser.image ?? token.picture;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
          if (session.user && session.user.email) {
            // Always fetch latest user info from DB
            const user = await prisma.user.findUnique({
              where: { email: session.user.email },
              select: { name: true, email: true, image: true },
            });
            if (user) {
              session.user.name = user.name ?? token.name ?? session.user.name;
              session.user.email = user.email ?? token.email ?? session.user.email;
              session.user.image = user.image ?? token.picture ?? session.user.image;
            }
          }
      }
      return session;
    },
  },
  providers: [
    Credentials({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const email = credentials?.email?.toString().trim().toLowerCase();
        const password = credentials?.password?.toString();

        if (!email || !password) {
          return null;
        }

        const user = await prisma.user.findUnique({
          where: { email },
        });

        if (!user?.passwordHash) {
          return null;
        }

        const isValid = await bcrypt.compare(password, user.passwordHash);

        if (!isValid) {
          return null;
        }

        return {
          id: user.id,
          email: user.email,
          name: user.name,
          image: user.image,
        };
      },
    }),
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  pages: {
    signIn: "/login",
  },
});
