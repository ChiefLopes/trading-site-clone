import { PrismaClient } from "@prisma/client";

// Singleton to prevent multiple instances of Prisma Client in development.
const prismaClientSingleton = () => {
  const url = process.env.DATABASE_URL || process.env.POSTGRES_PRISMA_URL || process.env.POSTGRES_URL;
  
  if (!url && process.env.NODE_ENV === "production" && process.env.NEXT_PHASE !== 'phase-production-build') {
    console.warn("⚠️ DATABASE_URL or POSTGRES_URL is missing in production!");
  }

  return new PrismaClient({
    datasourceUrl: url,
    log: process.env.NODE_ENV === "development" ? ["error", "warn"] : ["error"],
  });
};

const globalForPrisma = globalThis as unknown as { prisma?: PrismaClient };

// During build, we provide a placeholder OR the real client. 
// Note: returning {} can break NextAuth adapter initialization if it expects certain properties.
export const prisma = globalForPrisma.prisma ?? prismaClientSingleton();

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
