import { CalendarArrowDown, Edit2 } from "lucide-react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import dateCalculation from "@/lib/utils/dateCalculation";
import ProfileStatus from "./ProfileStatus";
import Link from "next/link";
function ProfileHeader({ user, username, currUser }) {
  const { id, avatar, firstName, bio, name, createdAt } = user || {};
  return (
    <div className="bg-gradient bg-gradient-to-tl rounded-lg from-indigo-400/10 via-purple-400/10 to-indigo-400/10 dark:from-indigo-400/5 dark:via-purple-400/5 dark:to-indigo-400/5 p-2 py-6 md:p-8 lg:px-20">
      <div className="relative grid grid-cols-[10rem_50%_1fr] gap-4 md:gap-8 md:gap-y-2">
        <div className="relative border mx-auto md:mx-0 border-border z-30 col-span-3 md:col-span-1 h-40 w-40 overflow-hidden rounded-full">
          <Image
            src={avatar}
            fill
            className="object-cover"
            sizes="160px"
            alt={`${firstName}' profile picture`}
          />
        </div>
        <div className="flex flex-col gap-y-4 w-full col-span-3 md:col-span-1">
          <div className="flex px-8 md:px-0">
            <div>
              <div className="flex flex-col gap-2 md:gap-3 text-center md:text-start">
                <p className="flex flex-col gap-0.5 md:flex-row md:items-center text-foreground text-2xl capitalize font-bold tracking-wide">
                  <span>{name}</span>
                  <span
                    tabIndex={0}
                    className="text-xs normal-case text-muted-foreground font-normal md:mt-1.5 cursor-pointer"
                  >
                    @{username}
                  </span>
                </p>
                {bio && (
                  <p className="text-sm text-foreground/80 break-words text-pretty">
                    {bio}
                  </p>
                )}
                <p className="flex items-center justify-center md:justify-start text-xs text-muted-foreground space-x-1">
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
            <div className="md:block hidden ml-auto">
              <Link
                href="/settings/profile"
                className="bg-primary whitespace-nowrap rounded-lg text-indigo-50 px-4 !py-2 hover:bg-primary/75 active:bg-primary/75"
              >
                Edit Profile
              </Link>
            </div>
            <div className="md:hidden block absolute top-0 right-2">
              <Link
                href="/settings/profile"
                className="bg-primary rounded-lg flex items-center backdrop-blur-sm p-2 text-indigo-700 dark:text-indigo-100 bg-primary/70 active:bg-primary/75"
              >
                <Edit2 className="size-4" />
              </Link>
            </div>
          </>
        )}
        <ProfileStatus userId={user?.id} />
      </div>
    </div>
  );
}

export default ProfileHeader;
