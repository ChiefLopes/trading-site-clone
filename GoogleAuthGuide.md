# Google Auth Implementation Guide

## 1. Install NextAuth and Google Provider

```
npm install next-auth @auth/prisma-adapter bcryptjs
```

## 2. Configure Google Provider

**auth.ts**

```ts
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // ...other config
});
```

**auth.config.ts**

```ts
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";

export default {
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    }),
  ],
  // ...other config
} satisfies NextAuthConfig;
```

## 3. Add Google Provider to NextAuth

Already shown above in the `providers` array.

## 4. Session and JWT Callbacks

**auth.ts**

```ts
callbacks: {
  async jwt({ token, account, profile, user: adapterUser }) {
    if (account && profile && account.provider === "google") {
      const googleName = profile.name ||
        (profile as any).given_name ?
        `${(profile as any).given_name} ${(profile as any).family_name || ""}`.trim() :
        null;
      const email = profile.email || token.email;
      if (email && googleName) {
        // Update user name in DB if needed
      }
    }
    // Sync with DB
    return token;
  },
  async session({ session, token }) {
    // Always fetch latest user info from DB
    return session;
  },
},
```

## 5. Sign-In Page

**auth.ts**

```ts
pages: {
  signIn: "/login",
},
```

## 6. Middleware Auth Config

**auth.config.ts**

```ts
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
```

## 7. API Route Handler

**app/api/auth/[...nextauth]/route.ts**

```ts
import { handlers } from "@/auth";
export const { GET, POST } = handlers;
```

---

**Environment Variables:**

```
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret
```

---

This guide summarizes the Google Auth setup in your project with code examples for each step.
