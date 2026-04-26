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
      <LucideShare2 size={20} className="text-slate-500" />
      <span className="mt-0.5 font-medium text-text-muted">10</span>
    </button>
  );
}

export default ShareButton;
