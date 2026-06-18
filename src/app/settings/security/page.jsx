import { Button } from "@/components/ui/button";
import SecuritySessions from "@/features/settings/components/SecuritySessions";
import getCurrentUser from "@/lib/getUser";
import { Dot } from "lucide-react";

async function page() {
  const user = await getCurrentUser();
  return (
    <div>
      <div className="space-y-3">
        <h2 className="text-2xl tracking-wide text-start text-foreground font-sora font-semibold">
          Security
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Manage your account security and sessions.
        </p>
      </div>
      <SecuritySessions />
    </div>
  );
}

export default page;
