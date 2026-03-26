import { prisma } from "@/lib/prisma";

/**
 * Generates a unique username from a name or email.
 * Format: firstname + random 4-digit number (e.g. "john4829")
 * Falls back to email prefix if no name is provided.
 */
export async function generateUsername(
  name?: string | null,
  email?: string | null,
): Promise<string> {
  // Extract base from name or email
  let base = "";

  if (name && name.trim().length > 0) {
    // Merge name parts: "John Doe" -> "johndoe"
    base = name
      .trim()
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  if (!base && email) {
    // Fallback: use email prefix before @
    base = email
      .split("@")[0]
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "");
  }

  if (!base) {
    base = "user";
  }

  // Truncate if too long
  if (base.length > 15) {
    base = base.substring(0, 15);
  }

  // Try up to 10 times to find a unique username
  for (let i = 0; i < 10; i++) {
    const suffix = Math.floor(1000 + Math.random() * 9000); // 4-digit number
    const candidate = `${base}${suffix}`;

    const existing = await prisma.user.findFirst({
      where: { username: candidate },
      select: { id: true },
    });

    if (!existing) {
      return candidate;
    }
  }

  // Fallback: use timestamp-based suffix
  const fallbackSuffix = Date.now().toString().slice(-6);
  return `${base}${fallbackSuffix}`;
}
