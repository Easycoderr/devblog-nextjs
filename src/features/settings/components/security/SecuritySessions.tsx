import { Button } from "@/components/ui/button";
import getUserSessions from "@/lib/actions/auth/getUserSessions";
import SessionCard from "./SessionCard";

async function SecuritySessions() {
  const sessions = await getUserSessions();
  return (
    <div className="flex flex-col mt-6 gap-3 rounded-lg bg-card border border-border shadow-sm mb-6 px-6 py-4">
      <div className="space-y-2 border-b border-border pb-3">
        <h2 className="text-lg tracking-wide text-start text-foreground font-sora font-semibold">
          Active sessions
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed tracking-normal">
          You&apos;re currently signed in on these devices.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        {sessions.map((session) => (
          <SessionCard key={session.id} session={session} />
        ))}

        <div className="w-full">
          <Button
            variant="secondary"
            className="w-full md:w-auto text-center text-primary rounded-lg cursor-pointer p-2! border border-primary/50 text-sm font-medium tracking-wide hover:bg-primary/30"
          >
            Logout all other sessions
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SecuritySessions;
