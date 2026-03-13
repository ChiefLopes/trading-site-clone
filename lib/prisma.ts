import { PrismaClient } from "@prisma/client";

// Singleton to prevent multiple instances of Prisma Client in development.
// Standard pattern for Next.js to avoid "Too many connections" during Fast Refresh.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
    errorFormat: 'pretty',
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Robust DB Query Wrapper
 * This helps handle transient Neon/Postgres connection drops (kind: Closed).
 * It will retry once if a connection error is detected.
 */
export async function safeDbQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  try {
    return await query();
  } catch (error: any) {
    // If it's a connection error, try one more time
    if (error?.message?.includes('Closed') || error?.message?.includes('connection')) {
      console.warn("Retrying database query due to transient connection drop...");
      try {
        return await query();
      } catch (retryError) {
        console.error("Database query failed after retry:", retryError);
        return fallback;
      }
    }
    console.error("Database query error:", error);
    return fallback;
  }
}
