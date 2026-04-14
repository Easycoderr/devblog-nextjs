import { Skeleton } from "@/components/ui/skeleton";

function PostDetailsSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-7 gap-x-7">
      <Skeleton className="h-7 w-42 rounded-full" />
      <div>
        <Skeleton className="h-80 w-full" />
      </div>
      <div className="space-y-6">
        {/* title */}
        <Skeleton className="h-7 w-42 rounded-full" />
        {/* description */}
        <div className="flex gap-1 flex-col">
          <Skeleton className="h-2 w-full shrink-0 rounded-full" />
          <Skeleton className="h-2 max-w-86 md:max-w-42 shrink-0 rounded-full" />
        </div>
        {/* category + date */}
        <div className="flex items-center gap-3 mt-auto">
          <div className="flex items-center gap-3">
            <Skeleton className="h-4 w-10 rounded-full" />
            <Skeleton className="h-1 w-1 rounded-full" />
            <Skeleton className="h-4 w-14 rounded-full" />
          </div>
        </div>
      </div>
      {/* content */}
      <div className="flex gap-1 flex-col md:col-span-2">
        <Skeleton className="h-2 w-full shrink-0 rounded-full" />
        <Skeleton className="h-2 w-full shrink-0 rounded-full" />
        <Skeleton className="h-2 max-w-86 md:max-w-4xl shrink-0 rounded-full" />
      </div>
    </div>
  );
}

export default PostDetailsSkeleton;
