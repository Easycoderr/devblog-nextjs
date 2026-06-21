"use client";
import { accentThemes } from "@/config/accent-colors";
import { useTheme } from "next-themes";
import { useEffect } from "react";

function AccentProvider({ children }) {
  const { theme } = useTheme();
  useEffect(() => {
    const isDark = document.documentElement.classList.contains("dark");
    const accent = localStorage.getItem("accent-theme");
    const selectedTheme = isDark ? "dark" : "light";

    if (accent) {
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

export default AccentProvider;
