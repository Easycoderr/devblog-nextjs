import { Button } from "@/components/ui/button";
import { Dot } from "lucide-react";

function SecuritySessions() {
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
        <div className="space-y-4 md:flex md:justify-between md:items-center">
          <div className="flex flex-col">
            {/* Software and browser name */}
            <h4 className="font-medium flex ">
              Windows <Dot /> Chrome
            </h4>
            <div className="flex justify-between items-center text-muted-foreground text-sm">
              <div className="flex">
                {/* location and time */}
                <p>Lahore, pakistan</p>
                <Dot />
                <p>This device</p>
              </div>
            </div>
          </div>
          <div>
            <p className="text-center text-brand-success rounded-lg p-2 bg-brand-success/20 text-sm font-medium tracking-wide">
              Current session
            </p>
          </div>
        </div>
        <div className="space-y-4 md:flex md:justify-between md:items-center">
          <div className="flex flex-col">
            <h4 className="font-medium flex ">
              Windows <Dot /> Chrome
            </h4>
            <div className="flex justify-between items-center text-muted-foreground text-sm">
              <div className="flex">
                <p>Lahore, pakistan</p>
                <Dot />
                <p>This device</p>
              </div>
            </div>
          </div>
          <div>
            <Button
              size="8"
              variant="secondary"
              className="w-full md:w-auto text-center text-primary rounded-lg cursor-pointer !p-2 bg-primary/20 text-sm font-medium tracking-wide hover:bg-primary/10"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="space-y-4 md:flex md:justify-between md:items-center">
          <div className="flex flex-col">
            <h4 className="font-medium flex ">
              Windows <Dot /> Chrome
            </h4>
            <div className="flex justify-between items-center text-muted-foreground text-sm">
              <div className="flex">
                <p>Lahore, pakistan</p>
                <Dot />
                <p>This device</p>
              </div>
            </div>
          </div>
          <div>
            <Button
              size="8"
              variant="secondary"
              className="w-full md:w-auto text-center text-primary rounded-lg cursor-pointer !p-2 bg-primary/20 text-sm font-medium tracking-wide hover:bg-primary/10"
            >
              Logout
            </Button>
          </div>
        </div>
        <div className="w-full">
          <Button
            size="8"
            variant="secondary"
            className="w-full md:w-auto text-center text-primary rounded-lg cursor-pointer !p-2 border border-primary/50 text-sm font-medium tracking-wide hover:bg-primary/30"
          >
            Logout all other sessions
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SecuritySessions;
