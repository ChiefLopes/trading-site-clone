import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { PrismaAdapter } from "@auth/prisma-adapter";
import bcrypt from "bcryptjs";

import { prisma } from "@/lib/prisma";
import { generateAndSendOTP, sendWelcomeEmail } from "@/lib/mail";
import { generateUsername } from "@/lib/username";
import authConfig from "./auth.config";

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  callbacks: {
    async signIn({ user, account, profile }) {
      // Aggressive auto-linking for Google sign-in
      if (account?.provider === "google" && user?.email) {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email },
            include: { accounts: true },
          });
          if (existingUser) {
            // Check if Google account is already linked
            const hasGoogleAccount = existingUser.accounts.some(
              (a) => a.provider === "google",
            );
            if (!hasGoogleAccount) {
              // Remove any orphaned Google accounts for this providerAccountId
              await prisma.account.deleteMany({
                where: {
                  provider: "google",
                  providerAccountId: account.providerAccountId,
                  userId: { not: existingUser.id },
                },
              });
              // Link Google account to existing user
              await prisma.account.create({
                data: {
                  userId: existingUser.id,
                  type: account.type,
                  provider: account.provider,
                  providerAccountId: account.providerAccountId,
                  access_token: account.access_token ?? null,
                  refresh_token: account.refresh_token ?? null,
                  expires_at: account.expires_at ?? null,
                  token_type: account.token_type ?? null,
                  scope: account.scope ?? null,
                  id_token: account.id_token ?? null,
                  session_state: (account.session_state as string) ?? null,
                },
              });
              // Also update emailVerified
              await prisma.user.update({
                where: { id: existingUser.id },
                data: { emailVerified: new Date() },
              });
              // Send welcome email for newly linked Google account
              await sendWelcomeEmail(user.email, existingUser.name);

              // Generate username if the user doesn't have one
              if (!existingUser.username) {
                const username = await generateUsername(
                  existingUser.name,
                  user.email,
                );
                await prisma.user.update({
                  where: { id: existingUser.id },
                  data: { username },
                });
              }
              console.log(
                "Aggressive auto-link: Linked Google to existing user",
                user.email,
              );
            } else {
              console.log(
                "Aggressive auto-link: Google already linked for",
                user.email,
              );
            }
            return true;
          } else {
            // Brand new Google user — let NextAuth create user, then send welcome email
            await sendWelcomeEmail(user.email, profile?.name || user.name);

            // After PrismaAdapter creates the user, generate a username
            // We do this in a setTimeout to ensure the user record exists
            const googleName = profile?.name || user.name;
            const googleEmail = user.email;
            setTimeout(async () => {
              try {
                const newUser = await prisma.user.findUnique({
                  where: { email: googleEmail },
                });
                if (newUser && !newUser.username) {
                  const username = await generateUsername(
                    googleName,
                    googleEmail,
                  );
                  await prisma.user.update({
                    where: { id: newUser.id },
                    data: { username },
                  });
                  console.log(
                    `Auto-generated username '${username}' for Google user ${googleEmail}`,
                  );
                }
              } catch (err) {
                console.error(
                  "Error generating username for Google user:",
                  err,
                );
              }
            }, 2000);
            console.log(
              "Aggressive auto-link: New Google user created",
              user.email,
            );
            return true;
          }
        } catch (e) {
          console.error("Aggressive auto-link error:", e);
          // Still allow sign in to avoid blocking
          return true;
        }
      }
      return true;
    },
    async jwt({ token, account, profile, user: adapterUser }) {
      // On sign-in, 'adapterUser' (from Prisma) or 'profile' (from Google) are available
      if (account && profile && account.provider === "google") {
        // Store provider in token so proxy can skip OTP for OAuth users
        token.provider = "google";

        const nameFromProfile =
          profile.name ||
          ((profile as any).given_name
            ? `${(profile as any).given_name} ${(profile as any).family_name || ""}`.trim()
            : null);
        const googleName =
          typeof nameFromProfile === "string"
            ? nameFromProfile.replace("undefined", "").trim()
            : null;

        const email = profile.email || token.email;

        if (email) {
          const updateData: any = { emailVerified: new Date() };

          if (googleName && googleName.length > 0) {
            const currentName = adapterUser?.name || token.name || "";
            if (
              !currentName ||
              currentName.toLowerCase() === "user" ||
              currentName.toLowerCase() === "undefined undefined"
            ) {
              updateData.name = googleName;
              token.name = googleName;
            }
          }

          try {
            await prisma.user.update({
              where: { email },
              data: updateData,
            });
          } catch (e) {
            console.error("Error updating user from Google:", e);
          }
        }

        // Mark as verified in the token immediately so the first redirect is correct
        token.emailVerified = true;
      } else if (account && account.provider === "credentials") {
        token.provider = "credentials";
      }

      const email = token.email?.toString();
      if (!email) return token;

      // Ensure we have the latest data from DB for the token
      const dbUser = await prisma.user.findUnique({
        where: { email },
        select: { name: true, email: true, image: true, emailVerified: true },
      });

      if (dbUser) {
        token.name = dbUser.name ?? token.name;
        token.email = dbUser.email ?? token.email;
        token.picture = dbUser.image ?? token.picture;
        // For Google users, emailVerified is always true (set above or from DB)
        token.emailVerified =
          token.provider === "google" ? true : !!dbUser.emailVerified;
      }

      return token;
    },
    async session({ session, token }) {
      // Expose provider to session
      (session as any).provider = token.provider;
      if (session.user && session.user.email) {
        // Always fetch latest user info from DB
        const user = await prisma.user.findUnique({
          where: { email: session.user.email },
          select: { name: true, email: true, image: true, emailVerified: true },
        });
        if (user) {
          session.user.name = user.name ?? token.name ?? session.user.name;
          session.user.email = user.email ?? token.email ?? session.user.email;
          session.user.image =
            user.image ?? token.picture ?? session.user.image;
          // Always treat Google users as verified
          if (token.provider === "google") {
            (session.user as any).emailVerified = true;
          } else {
            (session.user as any).emailVerified = !!user.emailVerified;
          }
        }
      }
      return session;
    },
  },
  providers: [
    ...authConfig.providers,
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
  ],
});
