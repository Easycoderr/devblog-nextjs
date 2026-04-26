"use client";
import { cn } from "@/lib/utils";
import { TrashIcon } from "lucide-react";

import React from "react";
const styles = {
  primary:
    "bg-red-100 p-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-red-200 transition-all duration-200 cursor-pointer",
  secondary:
    "flex gap-2 items-center bg-red-100 px-4 py-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-red-200 transition-all duration-200 cursor-pointer",
  simple: "w-full",
};

const DeleteButton = React.forwardRef(function DeleteButton(
  { children, className, variant = "primary", ...props },
  ref,
) {
  return (
    <span
      {...props}
      aria-label="delete post"
      ref={ref}
      className={cn(`${styles[variant]}`, className)}
    >
      {children}
    </span>
  );
});

export default DeleteButton;
