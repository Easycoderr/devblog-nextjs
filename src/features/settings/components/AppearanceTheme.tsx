"use client";
import {
  CheckCircle,
  CheckCircle2,
  CheckCircle2Icon,
  CheckCircleIcon,
  ComputerIcon,
  LucideCheckCircle,
  MoonIcon,
  Sun,
} from "lucide-react";
import { useTheme } from "next-themes";

function AppearanceTheme() {
  const { theme, setTheme } = useTheme();
  return (
    <div className="flex flex-col gap-3 rounded-lg bg-card border border-border shadow-sm px-6 py-4">
      <div className="space-y-2 border-b border-border pb-3">
        <h2 className="text-lg tracking-wide text-start transition-all duration-300 text-foreground font-sora font-semibold">
          Theme
        </h2>
        <p className="text-sm text-muted-foreground leading-relaxed tracking-normal">
          Choose your preferred theme.
        </p>
      </div>
      <div className="grid xl:grid-cols-3 grid-cols-2 gap-1.5">
        <button
          onClick={() => setTheme("light")}
          className={`relative flex flex-col gap-5 text-start hover:bg-primary/10 transition-all duration-300 border cursor-pointer rounded-lg p-4 ${theme === "light" ? "text-primary border-primary scale-95" : "text-foreground border-border"}`}
        >
          <div>
            <Sun className="size-6" />
          </div>
          <div>
            <p className="font-medium">Light</p>
            <p className="text-sm text-muted-foreground">default light theme</p>
          </div>
          {theme === "light" && (
            <CheckCircle2 className="absolute top-2 right-2 size-6" />
          )}
        </button>
        <button
          onClick={() => setTheme("dark")}
          className={`relative flex flex-col gap-5 text-start hover:bg-primary/10 transition-all duration-300 border cursor-pointer rounded-lg p-4 ${theme === "dark" ? "text-primary border-primary scale-95" : "text-foreground border-border"}`}
        >
          <div>
            <MoonIcon className="size-6" />
          </div>
          <div>
            <p className="font-medium">Dark</p>
            <p className="text-sm text-muted-foreground">Easy on the eyes</p>
          </div>
          {theme === "dark" && (
            <CheckCircle2 className="absolute top-2 right-2 size-6" />
          )}
        </button>
        <button
          onClick={() => setTheme("system")}
          className={`relative flex flex-col gap-5 text-start hover:bg-primary/10 transition-all duration-300 border cursor-pointer rounded-lg p-4 ${theme === "system" ? "text-primary border-primary scale-95" : "text-foreground border-border"}`}
        >
          <div>
            <ComputerIcon className="size-6" />
          </div>
          <div>
            <p className="font-medium">System</p>
            <p className="text-sm text-muted-foreground">syncs system theme</p>
          </div>
          {theme === "system" && (
            <CheckCircle2 className="absolute top-2 right-2 size-6" />
          )}
        </button>
      </div>
    </div>
  );
}

export default AppearanceTheme;
