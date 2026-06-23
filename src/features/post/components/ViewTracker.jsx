"use client";
import { incrementViewPost } from "@/lib/actions/post";
import { useEffect } from "react";

function ViewTracker({ userId, slug }) {
  useEffect(() => {
    const timer = setTimeout(async () => {
      const result = await incrementViewPost(slug, userId);
      console.log(result);
    }, 4000);
    return () => clearTimeout(timer);
  }, [slug, userId]);

  return null;
}

export default ViewTracker;
