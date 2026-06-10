"use client";
import Image from "next/image";
import Link from "next/link";
function UserAvatar({ user, variant = "default" }) {
  const style = {
    default: "text-xs text-text flex items-center gap-1",
    secondary: "text-xs text-text flex items-center gap-1",
  };
  const { name, avatar, userName } = user || {};
  return (
    <div className={style[variant]}>
      {avatar && (
        <div className="relative rounded-full h-8 w-8 overflow-hidden border border-border">
          <Image
            fill
            sizes="32px"
            src={avatar}
            className="object-cover"
            alt={`${name}-user`}
            quality={100}
          />
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
