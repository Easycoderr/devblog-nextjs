"use client";

import { Skeleton } from "@/components/ui/skeleton";
const array = Array.from({ length: 2 }, (_, index) => index + 1);
function PostCommentListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2  lg:grid-cols-4 gap-6 px-4 md:px-0">
      {array.map((item) => (
        <PostCommentSkeleton key={item} />
      ))}
    </div>
  );
}
function PostCommentSkeleton() {
  return (
    <div
      className={
        "p-2 space-y-2 border-l-2 border-gray-300 bg-gray-200 animate-pulse"
      }
    >
      <div className="flex justify-between">
        <div className="flex flex-col gap-2 w-full">
          <div className="flex items-center gap-1 flex-wrap">
            <Skeleton className="h-6 w-40 rounded-lg" />
          </div>
          <Skeleton className="h-2 max-w-96 md:max-w-72 shrink-0 rounded-full" />
          <Skeleton className="h-2 max-w-86 md:max-w-68 shrink-0 rounded-full" />
        </div>
        {/* actions */}
        <Skeleton className="h-4 w-10 rounded-lg" />
      </div>
      <div className="flex gap-2">
        <Skeleton className="h-4 w-15 rounded-lg" />
        <Skeleton className="h-4 w-15 rounded-lg" />
      </div>
    </div>
  );
}

export default PostCommentListSkeleton;
