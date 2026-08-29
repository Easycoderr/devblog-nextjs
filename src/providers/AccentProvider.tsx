"use client";
import { accentThemes } from "@/config/accent-colors";
import { useTheme } from "next-themes";
import React, { useEffect } from "react";
import { keyof } from "zod";

function AccentProvider({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const selectedTheme = isDark ? "dark" : "light";
    const accent = localStorage.getItem("accent-theme");

    if (accent && isAccentTheme(accent)) {
      document.documentElement.style.setProperty(
        "--color-primary",
        accentThemes[accent][selectedTheme].primary,
      );

      document.documentElement.style.setProperty(
        "--color-ring",
        accentThemes[accent][selectedTheme].ring,
      );

      document.documentElement.style.setProperty(
        "--color-brand-primary",
        accentThemes[accent][selectedTheme].primary,
      );

      document.documentElement.style.setProperty(
        "--color-brand-primary-hover",
        accentThemes[accent][selectedTheme].hover,
      );
    }
  }, [theme]);
  return children;
}
function isAccentTheme(value: string): value is keyof typeof accentThemes {
  return value in accentThemes;
}
export default AccentProvider;
