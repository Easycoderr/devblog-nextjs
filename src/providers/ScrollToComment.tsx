"use client";
import { useEffect } from "react";

type ScrollToCommentProps = { triggerDependency: any };
function ScrollToComment({ triggerDependency }: ScrollToCommentProps) {
  useEffect(() => {
    const hash = window.location.hash.replace("#", "");
    const element = document.getElementById(hash);
    if (element) {
      element.scrollIntoView({
        behavior: "smooth",
        block: "center",
      });
      element.classList.add("highlight-comment");
      setTimeout(() => {
        element.classList.remove("highlight-comment");
      }, 5000);
    }
  }, [triggerDependency]);
  return null;
}

export default ScrollToComment;
