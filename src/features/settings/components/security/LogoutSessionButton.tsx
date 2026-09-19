"use client";

import { Button } from "@/components/ui/button";
import logoutSession from "@/lib/actions/settings/security/logoutSession";
import { toast } from "sonner";

function SessionLogoutButton({ sessionId }: { sessionId: string }) {
  async function handleLogoutSession() {
    const response = await logoutSession(sessionId);
    if (!response) {
      toast.error("Something went wrong!");
    }
    if (!response?.success) {
      toast.error(response?.message);
    } else {
      toast.success(response?.message);
    }
  }
  return (
    <Button
      onClick={handleLogoutSession}
      variant="secondary"
      className="w-full md:w-auto text-center text-primary rounded-lg cursor-pointer p-2! py-4! bg-primary/20 text-sm font-medium tracking-wide hover:bg-primary/10"
    >
      Logout
    </Button>
  );
}

export default SessionLogoutButton;
