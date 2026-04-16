"use client";
import { TrashIcon } from "lucide-react";
import React from "react";
const styles = {
  primary:
    "bg-red-100 p-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-red-200 transition-all duration-200 cursor-pointer",
  secondary:
    "flex gap-2 items-center bg-red-100 px-4 py-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-red-200 transition-all duration-200 cursor-pointer",
};

const DeleteButton = React.forwardRef(function DeleteButton(
  { children, variant = "primary", ...props },
  ref,
) {
  console.log(variant, styles[variant]);
  return (
    <button
      {...props}
      aria-label="delete post"
      ref={ref}
      className={`${styles[variant]}`}
    >
      <TrashIcon size={18} className="text-red-500" />
      {children}
    </button>
  );
});

export default DeleteButton;
