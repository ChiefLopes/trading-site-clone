import { PrismaClient } from "@prisma/client";

// Singleton to prevent multiple instances of Prisma Client in development.
const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

const isBuild = process.env.NEXT_PHASE === 'phase-production-build';

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL || "postgresql://dummy:dummy@localhost:5432/dummy?sslmode=disable",
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

export const prisma = globalForPrisma.prisma ?? (isBuild ? {} as any : prismaClientSingleton());

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/**
 * Robust DB Query Wrapper
 * Handles transient "Closed" connection errors (common with Neon cold starts).
 */
export async function safeDbQuery<T>(query: () => Promise<T>, fallback: T): Promise<T> {
  // Never run DB queries during build
  if (process.env.NEXT_PHASE === 'phase-production-build') {
    return fallback;
  }

  try {
    return await query();
  } catch (error: any) {
    const isConnErr = error?.message?.includes('Closed') || 
                      error?.message?.includes('connection') ||
                      error?.message?.includes('reach database');

    if (isConnErr) {
      console.warn("DB Connection Issue. Retrying in 1s...");
      await new Promise(r => setTimeout(r, 1000));
      try {
        return await query();
      } catch (retryError) {
        console.error("DB Query failed after retry:", retryError);
        return fallback;
      }
    }
    
    console.error("DB Query Error:", error);
    return fallback;
  }
}
