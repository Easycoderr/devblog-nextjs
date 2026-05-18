"use client";
import React, { useTransition } from "react";
import { Button } from "@/components/ui/button";
import { signOutUser } from "@/lib/actions/auth";

function ConfirmSignOutAction() {
  const [isPending, startTransition] = useTransition();
  async function handleSignout() {
    startTransition(async () => {
      await signOutUser();
    });
  }
  return (
    <Button variant="destructive" disabled={isPending} onClick={handleSignout}>
      {isPending ? "Loading..." : "Yes, Signout"}
    </Button>
  );
}

export default ConfirmSignOutAction;
