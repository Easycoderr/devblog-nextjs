import SecuritySessions from "@/features/settings/components/security/SecuritySessions";
import getCurrentUser from "@/lib/getUser";

async function page() {
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
