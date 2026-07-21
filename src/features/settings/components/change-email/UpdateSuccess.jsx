"use client";

import { useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";

export default function UpdateSuccess({ email, message }) {
  const { status, update } = useSession();
  const hasUpdated = useRef(false);

  useEffect(() => {
    // ONLY run if the session is fully loaded and authenticated
    if (status === "authenticated" && !hasUpdated.current) {
      hasUpdated.current = true;

      update({ email: email }).then(() => {
        toast.success(message);

        setTimeout(() => {
          window.location.assign("/settings/account");
        }, 2000);
      });
    }
  }, [email, message, update, status]); // Add status to dependency array

  return (
    <div className="flex flex-col items-center justify-center min-h-150 gap-4">
      <h2 className="text-2xl font-bold text-primary">Email Verified!</h2>
      <p className="text-muted-foreground">{message}</p>
      <div className="animate-pulse text-sm text-muted-foreground mt-4">
        Redirecting you back to settings...
      </div>
    </div>
  );
}
