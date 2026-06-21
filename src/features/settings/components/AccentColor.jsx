"use client";
import { accentColors, accentThemes } from "@/config/accent-colors";
import { Check } from "lucide-react";
import { useTheme } from "next-themes";

import { useEffect, useState } from "react";

function AccentColor() {
  const { theme } = useTheme();
  const [currTheme, setCurrTheme] = useState("dark");
  const [color, setColor] = useState(
    localStorage.getItem("accent-theme") || "indigo",
  );

  useEffect(() => {
    console.log("COLOR:", color);
    const isDark = document.documentElement.classList.contains("dark");
    isDark ? setCurrTheme("dark") : setCurrTheme("light");
    localStorage.setItem("accent-theme", color);
    document.documentElement.style.setProperty(
      "--color-primary",
      accentThemes[color][currTheme],
    );
    document.documentElement.style.setProperty(
      "--color-primary",
      accentThemes[color][currTheme].primary,
    );

    document.documentElement.style.setProperty(
      "--color-ring",
      accentThemes[color][currTheme].ring,
    );

    document.documentElement.style.setProperty(
      "--color-brand-primary",
      accentThemes[color][currTheme].primary,
    );

    document.documentElement.style.setProperty(
      "--color-brand-primary-hover",
      accentThemes[color][currTheme].hover,
    );
  }, [color, currTheme, theme]);

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-card border border-border shadow-sm px-6 py-4">
      <div className="space-y-2 border-b border-border pb-3">
        <h2 className="text-lg tracking-wide text-start transition-all duration-300 text-foreground font-sora font-semibold">
          Accent Color
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed tracking-normal">
          Choose your favorite accent color.
        </p>
      </div>
      <div className="flex flex-wrap gap-4 p-2">
        {accentColors.map((colorItem, index) => (
          <button
            onClick={() => setColor(colorItem)}
            key={index}
            style={{
              backgroundColor: accentThemes[colorItem][currTheme].primary,
            }}
            className={`size-12 cursor-pointer rounded-full flex items-center justify-center ${color === colorItem && "outline-offset-1 outline-2 outline-white/30"}`}
          >
            {color === colorItem && <Check className="text-white" />}
          </button>
        ))}
      </div>
    </div>
  );
}

export default AccentColor;
