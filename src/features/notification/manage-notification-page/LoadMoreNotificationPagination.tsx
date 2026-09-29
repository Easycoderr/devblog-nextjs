"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

function LoadMoreNotificationPagination() {
  const [visibleCount, setVisibleCount] = useState<number>(8);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (visibleCount && visibleCount > 8) {
      params.set("take", visibleCount.toString());
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
  }, [visibleCount]);
  function handleShowMore() {
    setVisibleCount((value) => value + 8);
  }
  return (
    <div className="flex mt-10 w-full">
      <Button
        type="button"
        onClick={handleShowMore}
        variant="default"
        className="mx-auto cursor-pointer"
      >
        Show more...
      </Button>
    </div>
  );
}

export default LoadMoreNotificationPagination;
