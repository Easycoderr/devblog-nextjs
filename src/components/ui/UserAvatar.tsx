"use client";
import { UserType } from "@/types/userType";
import { Prisma } from "@prisma/client";
import Image from "next/image";
import Link from "next/link";
type UserAvatarProps = {
  user: Prisma.UserGetPayload<{
    select: { name: true; avatar: true; userName: true };
  }>;
  variant?: "default" | "secondary";
  size?: string;
};
function UserAvatar({
  user,
  variant = "default",
  size = "8",
}: UserAvatarProps) {
  const style = {
    default: "text-xs text-text flex items-center gap-1",
    secondary: "text-xs text-text flex items-center gap-1",
  };
  const sizes = String((Number(size) * 14) / 8);
  const { name, avatar, userName } = user || {};
  return (
    <div className={style[variant]}>
      {avatar ? (
        <div
          className={`relative rounded-full h-6 h-${size} w-${size} overflow-hidden border border-border`}
        >
          <Image
            fill
            sizes={`${sizes}px}`}
            src={avatar}
            className="object-cover"
            alt={`${name}-user`}
            quality={100}
          />
        </div>
      ) : (
        // fallback
        <div className="relative flex items-center justify-center rounded-full h-8 w-8 overflow-hidden border border-border">
          <span className="font-bold text-lg capitalize text-primary">
            {name?.at(0)}
          </span>
        </div>
      )}
      <Link href={`/u/${userName}`}>
        <p className="text-sm font-medium hover:opacity-75 select-none cursor-pointer capitalize tracking-wide">
          {name}
        </p>
      </Link>
    </div>
  );
}

export default UserAvatar;
