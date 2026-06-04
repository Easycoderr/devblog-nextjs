import { Button } from "@/components/ui/button";
import { getUserByUserName } from "@/lib/actions/auth";
import dateCalculation from "@/lib/utils/dateCalculation";
import { format } from "date-fns/fp";
import { CalendarArrowDown, LogInIcon } from "lucide-react";
import Image from "next/image";

async function page({ params }) {
  const { username } = await params;
  const user = await getUserByUserName(username);
  const { avatar, firstName, bio, name, createdAt } = user || {};
  return (
    <div className="space-y-12 relative w-full">
      {/* main */}
      <main className="container flex flex-col px-10 py-10 mx-auto">
        <div className="grid grid-cols-1 gap-y-8">
          <div className="bg-gradient bg-gradient-to-tl rounded-lg from-indigo-400/10 via-purple-400/10 to-indigo-400/10 dark:from-indigo-400/5 dark:via-purple-400/5 dark:to-indigo-400/5 p-2 py-6 md:p-8 lg:px-20">
            <div className="grid grid-cols-[10rem_1fr_1fr] gap-4 md:gap-8 md:gap-y-2">
              <div className="relative border  border-border z-30 min-h-24 min-w-24 md:min-h-40 md:min-w-40 overflow-hidden rounded-full">
                <Image
                  src={user?.avatar}
                  fill
                  className="object-cover"
                  sizes="160px"
                  alt={`${firstName}' profile picture`}
                />
              </div>
              <div className="flex flex-col gap-y-4 w-full">
                <div className="flex ">
                  <div>
                    <div className="flex flex-col gap-3">
                      <p className="flex flex-col gap-0.5 md:flex-row text-foreground text-lg md:text-xl capitalize font-bold tracking-wide">
                        <span>{name}</span>
                        <span className="text-xs self-center normal-case text-muted-foreground font-normal">
                          @{username}
                        </span>
                      </p>
                      {bio && (
                        <p className="text-sm text-muted-foreground">{bio}</p>
                      )}
                      <p className="flex items-center text-xs text-muted-foreground space-x-1">
                        <CalendarArrowDown size={13} />
                        <span>Joined</span>
                        <span>{dateCalculation(createdAt, "full")}</span>
                      </p>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
              <div className="hidden md:block ml-auto">
                <Button
                  variant="secondary"
                  className="bg-primary text-indigo-50 px-4 !py-2 hover:bg-primary/75"
                >
                  Edit Profile
                </Button>
              </div>
              <div className="flex col-span-2 col-start-2 items-center justify-between flex-wrap max-w-xl">
                <div>
                  <span className="font-bold tracking-wide">12</span>
                  <p className="text-muted-foreground text-sm">Articles</p>
                </div>
                <div>
                  <span className="font-bold tracking-wide">240</span>
                  <p className="text-muted-foreground text-sm">Likes</p>
                </div>
                <div>
                  <span className="font-bold tracking-wide">32</span>
                  <p className="text-muted-foreground text-sm">Comments</p>
                </div>
                <div>
                  <span className="font-bold tracking-wide">1.2k</span>
                  <p className="text-muted-foreground text-sm">Followers</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default page;
