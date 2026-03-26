"use client";

import { useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { toast } from "sonner";

export default function WelcomeToast() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    if (searchParams.get("welcome") === "true") {
      toast.success("Login successful! Welcome back.");
      // Clean the URL without reloading
      router.replace("/dashboard", { scroll: false });
    }
  }, [searchParams, router]);

  return null;
}
