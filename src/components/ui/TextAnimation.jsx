"use client";
import { cn } from "@/lib/utils";
import { motion, useInView } from "framer-motion";
import * as React from "react";

export function TextAnimation({
  text = "",
  className = "",
  duration = 0.5, // Custom animation speed (in seconds)
  delayStep = 0.05, // Custom delay between each letter (stagger effect)
  direction = "up", // Options: 'up', 'down', 'left', 'right'
}) {
  const splittedText = text.split("");
  const ref = React.useRef(null);
  const isInView = useInView(ref, { once: true });

  // Map directions to standard starting pixel offsets
  const directionOffsets = {
    up: { x: 0, y: 30 },
    down: { x: 0, y: -30 },
    left: { x: 30, y: 0 },
    right: { x: -30, y: 0 },
  };

  const selectedOffset = directionOffsets[direction] || directionOffsets.up;

  const pullupVariant = {
    initial: {
      x: selectedOffset.x,
      y: selectedOffset.y,
      opacity: 0,
    },
    animate: (i) => ({
      x: 0,
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 100,
        duration: duration,
        delay: i * delayStep,
      },
    }),
  };

  return (
    <div ref={ref} className="flex justify-center flex-wrap">
      {splittedText.map((current, i) => (
        <motion.div
          key={i}
          variants={pullupVariant}
          initial="initial"
          animate={isInView ? "animate" : ""}
          custom={i}
          className={cn(
            "text-xl text-center sm:text-4xl font-bold tracking-tighter md:text-6xl md:leading-[4rem]",
            className,
          )}
        >
          {current === " " ? <span>&nbsp;</span> : current}
        </motion.div>
      ))}
    </div>
  );
}
