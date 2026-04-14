import { Skeleton } from "@/components/ui/skeleton";

function FeaturedPostSkeleton() {
  return (
    <div className="grid md:grid-cols-2 md:grid-rows-1 bg-gray-50 grid-rows-2 grid-cols-1 p-6 mx-4 md:mx-0 rounded-xl">
      {/* LEFT */}
      <Skeleton className="rounded-xl min-w-full h-60"></Skeleton>
      <div className="relative flex flex-col gap-10 shadow-sm bg-gray-50 rounded-xl py-8 px-5">
        {/* head */}
        <Skeleton className="h-6 w-18 rounded-full" />
        <div className="space-y-4">
          {/* header */}
          <Skeleton className="h-8 w-42 rounded-full" />

          {/* description */}
          <div className="flex gap-1 flex-col">
            <Skeleton className="h-2 w-full shrink-0 rounded-full" />
            <Skeleton className="h-2 w-full shrink-0 rounded-full" />
            <Skeleton className="h-2 max-w-86 md:max-w-42 shrink-0 rounded-full" />
          </div>
        </div>
        {/* card body content */}
        <div className="flex flex-col gap-14 mt-auto">
          <div className="flex flex-col gap-4 text-sm mt-auto">
            <div className="flex items-center gap-3">
              <Skeleton className="h-4 w-10 rounded-full" />

              <Skeleton className="h-1 w-1 rounded-full" />
              <Skeleton className="h-4 w-14 rounded-full" />
            </div>
            <div className="flex">
              <Skeleton className="h-8 w-26 rounded-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeaturedPostSkeleton;
