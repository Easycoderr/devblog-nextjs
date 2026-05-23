"use client";
import Image from "next/image";
import { PenLine } from "lucide-react";
function UserAvatar({ user, variant = "default", isOwner }) {
  const style = {
    default: "text-xs text-gray-800 flex items-center gap-1",
    secondary: "text-xs text-gray-500 flex items-center gap-1",
  };
  const { name, firstName, lastName, avatar } = user || {};
  return (
    <p className={style[variant]}>
      {avatar && (
        <Image
          width={28}
          height={28}
          className="rounded-full border border-gray-500"
          src={avatar}
          alt={`${name}-user`}
        />
      )}
      <span className="text-current">{name}</span>
    </p>
  );
}

export default UserAvatar;
