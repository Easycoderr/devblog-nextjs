"use client";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

function NavigateBackButton({ children }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex tracking-wider text-sm items-center gap-1 text-muted-foreground hover:text-foreground active:scale-103 transition-all duration-200"
    >
      <ArrowLeft size={20} />
      <span>{children}</span>
    </button>
  );
}

export default NavigateBackButton;
