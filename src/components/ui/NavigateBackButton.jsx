"use client";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useRouter } from "next/navigation";

function NavigateBackButton({ children }) {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="flex tracking-wider text-sm items-center rounded-full gap-1 hover:opacity-90 hover:text-gray-50 hover:bg-black/90 active:opacity-100 active:scale-103 p-2 bg-black/20 text-black/90 transition-all duration-200"
    >
      <ArrowLeftCircleIcon size={20} />
      <span>{children}</span>
    </button>
  );
}

export default NavigateBackButton;
