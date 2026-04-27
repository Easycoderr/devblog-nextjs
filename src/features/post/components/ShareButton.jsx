"use client";
import { LucideShare2 } from "lucide-react";
import { toast } from "sonner";

function ShareButton({ title, text, slug }) {
  const pathname = "http://localhost:3000/blogs";
  const url = `${pathname}/${slug}`;
  async function handleShare() {
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: text,
          url: url,
        });
      } catch (error) {
        console.error("Error sharing:", error);
      }
    } else {
      // fallback
      toast.info("Web Share not supported! Copying to clipboard...");
      navigator.clipboard.writeText(url);
    }
  }
  return (
    <button className="mt-0.5 flex gap-1 items-center" onClick={handleShare}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        className={
          "w-5 h-5 active:scale-105 transition-all duration-200 text-slate-50 bg-indigo-500 p-0.5 rounded-full"
        }
        fill="currentColor"
        aria-hidden="true"
      >
        <path d="M14 3v5c-7 0-12 4-13 13 3-5 8-7 13-7v5l9-8-9-8z" />
      </svg>
      <span className="mt-0.5 font-medium text-text-muted">10</span>
    </button>
  );
}

export default ShareButton;
