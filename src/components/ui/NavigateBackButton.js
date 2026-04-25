"use client";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function NavigateBackButton({ children }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex tracking-wider items-center rounded-full gap-1 hover:opacity-90 hover:bg-hover active:opacity-100 active:scale-103 px-3 py-1.5 bg-black/80 text-gray-50 transition-all duration-200"
    >
      <ArrowLeftCircleIcon size={23} />
      <span>{children}</span>
    </button>
  );
}

export default NavigateBackButton;
