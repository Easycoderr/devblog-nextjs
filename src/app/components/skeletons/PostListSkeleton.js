"use client";
import { Skeleton } from "@/components/ui/skeleton";
const array = Array.from({ length: 4 }, (_, index) => index + 1);
function PostListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 px-4 md:px-0">
      {array.map((item) => (
        <SkeletonItem key={item} />
      ))}
    </div>
  );
}
function SkeletonItem() {
  return (
    <div className="flex overflow-hidden flex-col gap-4 shadow rounded-lg">
      {/* image */}
      <Skeleton className="h-64 w-full rounded-b-none shrink-0" />
      {/* content */}
      <div className="space-y-3 p-3 mt-auto">
        <Skeleton className="w-32 h-6 shrink-0 rounded-full" />
        {/* description */}
        <div className="flex gap-1 flex-col">
          <Skeleton className="h-2 w-full shrink-0 rounded-full" />
          <Skeleton className="h-2 max-w-86 md:max-w-42 shrink-0 rounded-full" />
        </div>
        <div className="flex flex-col gap-4 text-sm mt-auto">
          <div className="flex items-center gap-3">
            <Skeleton className="h-3 w-10 shrink-0 rounded-full" />
            <span className="flex items-center gap-1">
              <Skeleton className="h-3 w-16 shrink-0 rounded-full" />
              <Skeleton className="h-3 w-16 shrink-0 rounded-full" />
            </span>
          </div>
          <div className="flex justify-between">
            <Skeleton className="h-8 w-32 shrink-0  rounded-full" />
          </div>
        </div>
      </div>
    </div>
  );
}
export default PostListSkeleton;
