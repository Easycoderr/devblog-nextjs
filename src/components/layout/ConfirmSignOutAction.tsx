"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import signOutUser from "@/lib/actions/auth/signOut";

function ConfirmSignOutAction({ className }: { className: string }) {
  const [isPending, startTransition] = useTransition();
  function handleSignout() {
    startTransition(async () => {
      await signOutUser();
    });
  }
  return (
    <Button
      variant="destructive"
      disabled={isPending}
      onClick={handleSignout}
      className={className}
    >
      {isPending ? "Loading..." : "Yes, Signout"}
    </Button>
  );
}

export default ConfirmSignOutAction;
