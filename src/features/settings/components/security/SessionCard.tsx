import parseUserAgent from "@/lib/utils/parseUserAgent";
import { Dot, MapPin } from "lucide-react";
import SessionLogoutButton from "./SessionLogoutButton";
type SessionCardProps = {
  session: {
    isCurrent: boolean;
    id: string;
    createdAt: Date;
    expires: Date;
    userAgent: string | null;
    ipAddress: string | null;
    lastActiveAt: Date;
    city: string | null;
    country: string | null;
    countryCode: string | null;
  };
};
function SessionCard({ session }: SessionCardProps) {
  const { browser, version, os } = parseUserAgent(session.userAgent);
  return (
    <div className="space-y-4 md:flex md:justify-between md:items-center">
      <div className="flex flex-col gap-1">
        {/* Software and browser name */}
        <h4 className="font-medium flex items-center">
          {browser}{" "}
          <span className="text-muted-foreground text-xs mt-1 ml-1">
            ({version})
          </span>
          <Dot />
          {os}
        </h4>
        <div className="flex justify-between items-center text-muted-foreground text-sm">
          <div className="flex">
            {/* location and time */}
            <p className="flex gap-1">
              <MapPin size={18} className="text-primary" />
              <span>{session.country || "Uknown"}</span>
            </p>
            <Dot />
            <p>{session.lastActiveAt.toLocaleString()}</p>
          </div>
        </div>
      </div>
      <div className="flex gap-2 items-center flex-col lg:flex-row">
        {session.isCurrent && (
          <div>
            <p className="text-center text-brand-success rounded-lg p-1.5 bg-brand-success/20 text-sm font-medium tracking-wide">
              Current session
            </p>
          </div>
        )}
        <div>
          <SessionLogoutButton sessionId={session.id} />
        </div>
      </div>
    </div>
  );
}

export default SessionCard;
