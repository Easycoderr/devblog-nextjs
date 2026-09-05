"use client";

import { useEffect, useRef } from "react";
import { toast } from "sonner";
import { useRouter, useSearchParams, usePathname } from "next/navigation";

export default function VerificationToast() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasFired = useRef(false);

  useEffect(() => {
    if (searchParams.get("verified") === "true" && !hasFired.current) {
      hasFired.current = true;
      toast.success("Email verified successfully. You can now sign in.");

      const params = new URLSearchParams(searchParams);
      params.delete("verified");
      const newUrl = params.toString()
        ? `${pathname}?${params.toString()}`
        : pathname;

      router.replace(newUrl, { scroll: false });
    }
  }, [searchParams, pathname, router]);

  return null;
}
