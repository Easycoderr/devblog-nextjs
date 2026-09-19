"use client";

import { Button } from "@/components/ui/button";
import logoutAllSessions from "@/lib/actions/settings/security/logoutAllSessions";
import { toast } from "sonner";

function LogoutAllSessionButton() {
  async function handleLogoutAllSessions() {
    const response = await logoutAllSessions();
    if (!response) {
      toast.error("Something went wrong!");
    }
    if (!response?.success) {
      toast.error(response?.message);
    }
  }
  return (
    <Button
      onClick={handleLogoutAllSessions}
      variant="secondary"
      className="w-full md:w-auto text-center text-primary rounded-lg cursor-pointer p-2! border border-primary/50 text-sm font-medium tracking-wide hover:bg-primary/30"
    >
      Logout all other sessions
    </Button>
  );
}

export default LogoutAllSessionButton;
