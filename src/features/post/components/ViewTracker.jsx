"use client";
import { incrementViewPost } from "@/lib/actions/post/incrementViewPost";
import { useEffect } from "react";

function ViewTracker({ slug }) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      await incrementViewPost(slug);
    }, 4000);
    return () => clearTimeout(timer);
  }, [slug]);

  return null;
}

export default ViewTracker;
