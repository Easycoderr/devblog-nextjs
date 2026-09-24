"use client";
import { useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";

export default function ScrollToComment() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    // This hook runs every single time the path changes OR search parameters update
    const rawHash = window.location.hash;
    if (!rawHash) return;

    // Grab the final clean hash anchor string
    const activeHash = rawHash.split("#").pop();
    if (!activeHash || !activeHash.startsWith("comment-")) return;

    let attempts = 0;
    const maxAttempts = 40; // Polling window threshold (4 seconds max)

    const checkAndScroll = setInterval(() => {
      const element = document.getElementById(activeHash);
      attempts++;

      if (element) {
        clearInterval(checkAndScroll);

        // Smooth scroll alignment execution
        element.scrollIntoView({
          behavior: "smooth",
          block: "center",
        });

        // Trigger dynamic visual focus class markup
        element.classList.add("highlight-comment");
        const highlightTimer = setTimeout(() => {
          element.classList.remove("highlight-comment");
        }, 4000);

        return () => clearTimeout(highlightTimer);
      }

      if (attempts >= maxAttempts) {
        clearInterval(checkAndScroll);
        console.warn(
          `Target element #${activeHash} could not be resolved in time.`,
        );
      }
    }, 100);

    return () => clearInterval(checkAndScroll);
  }, [pathname, searchParams]); // 🚀 CRITICAL: Fires reliably on every Next.js navigation event!

  return null;
}
