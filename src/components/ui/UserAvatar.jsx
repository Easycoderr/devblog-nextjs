"use client";
import Image from "next/image";
function UserAvatar({ user, variant = "default", isOwner }) {
  const style = {
    default: "text-xs text-text flex items-center gap-1",
    secondary: "text-xs text-text flex items-center gap-1",
  };
  const { name, avatar } = user || {};
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
      <p className="text-sm font-medium capitalize tracking-wide">{name}</p>
    </div>
  );
}

export default UserAvatar;
