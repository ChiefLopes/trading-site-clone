import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;
  
  // Set the referral ID in a cookie (expires in 30 days)
  const cookieStore = await cookies();
  cookieStore.set("referral_id", id, {
    maxAge: 30 * 24 * 60 * 60, // 30 days
    path: "/",
  });

  // Redirect to register
  return NextResponse.redirect(new URL("/register", request.url));
}
