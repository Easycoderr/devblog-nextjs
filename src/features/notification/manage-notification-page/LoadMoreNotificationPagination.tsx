"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
const MAX_GROUP_SIZE = 8;
function LoadMoreNotificationPagination({
  notificationLength,
}: {
  notificationLength: number;
}) {
  const [visibleCount, setVisibleCount] = useState<number>(MAX_GROUP_SIZE);
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (visibleCount && visibleCount >= MAX_GROUP_SIZE) {
      params.set("take", visibleCount.toString());
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
  }, [visibleCount]);
  function handleShowMore() {
    const length = notificationLength - MAX_GROUP_SIZE;
    const extraValue = length < MAX_GROUP_SIZE ? length : MAX_GROUP_SIZE;
    setVisibleCount((value) => value + extraValue);
  }
  function handleShowLess() {
    console.log(notificationLength);
    const length = visibleCount - MAX_GROUP_SIZE;
    const extraValue = length < MAX_GROUP_SIZE ? length : MAX_GROUP_SIZE;
    setVisibleCount((value) => value - extraValue);
  }
  return (
    <div className="flex mt-10 w-full">
      {visibleCount > MAX_GROUP_SIZE && (
        <Button
          type="button"
          onClick={handleShowLess}
          variant="secondary"
          className="mx-auto cursor-pointer"
        >
          Show less...
        </Button>
      )}
      {notificationLength > visibleCount && (
        <Button
          type="button"
          onClick={handleShowMore}
          variant="default"
          className="mx-auto cursor-pointer hover:bg-primary/75!"
        >
          Show more...
        </Button>
      )}
    </div>
  );
}

export default LoadMoreNotificationPagination;
