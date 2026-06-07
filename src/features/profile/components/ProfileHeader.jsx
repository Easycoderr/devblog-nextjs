import { CalendarArrowDown, Edit2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dateCalculation from "@/lib/utils/dateCalculation";
function ProfileHeader({ user, username, currUser }) {
  const { id, avatar, firstName, bio, name, createdAt } = user || {};
  return (
    <div className="bg-gradient bg-gradient-to-tl rounded-lg from-indigo-400/10 via-purple-400/10 to-indigo-400/10 dark:from-indigo-400/5 dark:via-purple-400/5 dark:to-indigo-400/5 p-2 py-6 md:p-8 lg:px-20">
      <div className="relative grid grid-cols-[6rem_1fr_1fr] md:grid-cols-[10rem_50%_1fr] gap-4 md:gap-8 md:gap-y-2">
        <div className="relative border  border-border z-30 min-h-24 min-w-24 md:min-h-40 md:min-w-40 overflow-hidden rounded-full">
          <Image
            src={avatar}
            fill
            className="object-cover"
            sizes="160px"
            alt={`${firstName}' profile picture`}
          />
        </div>
        <div className="flex flex-col gap-y-4 w-full col-span-2 md:col-span-1">
          <div className="flex ">
            <div>
              <div className="flex flex-col gap-3">
                <p className="flex flex-col gap-0.5 md:flex-row md:items-center text-foreground text-lg md:text-xl capitalize font-bold tracking-wide">
                  <span>{name}</span>
                  <span className="text-xs normal-case text-muted-foreground font-normal">
                    @{username}
                  </span>
                </p>
                {bio && <p className="text-sm text-muted-foreground">{bio}</p>}
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
        {id === currUser?.id && (
          <>
            <div className="sm:block hidden ml-auto">
              <Button
                variant="secondary"
                className="bg-primary text-indigo-50 px-4 !py-2 hover:bg-primary/75"
              >
                Edit Profile
              </Button>
            </div>
            <div className="sm:hidden block absolute top-0 right-2">
              <Button
                variant="simple"
                className="bg-primary/30 rounded-lg backdrop-blur-sm !px-2 !py-0 text-indigo-700 dark:text-indigo-100 dark:bg-primary/20 active:bg-primary/75"
              >
                <Edit2 />
              </Button>
            </div>
          </>
        )}
        <div className="flex md:col-span-2 col-span-3 md:col-start-2 items-center justify-between flex-wrap max-w-xl md:px-0 px-2">
          <div>
            <span className="font-bold tracking-wide text-sm md:text-lg">
              12
            </span>
            <p className="text-muted-foreground text-xs md:text-sm">Articles</p>
          </div>
          <div>
            <span className="font-bold tracking-wide text-sm md:text-lg">
              240
            </span>
            <p className="text-muted-foreground text-xs md:text-sm">Likes</p>
          </div>
          <div>
            <span className="font-bold tracking-wide text-sm md:text-lg">
              32
            </span>
            <p className="text-muted-foreground text-xs md:text-sm">Comments</p>
          </div>
          <div>
            <span className="font-bold tracking-wide text-sm md:text-lg">
              1.2k
            </span>
            <p className="text-muted-foreground text-xs md:text-sm">
              Followers
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
