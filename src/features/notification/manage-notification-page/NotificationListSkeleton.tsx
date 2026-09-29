import { Skeleton } from "@/components/ui/skeleton";

function NotificationListSkeleton() {
  return (
    <div className="space-y-2">
      {Array.from({ length: 5 }).map((_, index) => (
        <NotificationCardSkeleton key={index} />
      ))}
    </div>
  );
}
function NotificationCardSkeleton() {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-border bg-background p-3">
      {/* Avatar */}
      <Skeleton className="h-11 w-11 shrink-0 rounded-full" />

      {/* Content */}
      <div className="min-w-0 flex-1 space-y-2">
        <Skeleton className="h-4 w-[75%]" />
        <Skeleton className="h-3 w-24" />
      </div>

      <Skeleton className="h-3 w-3 shrink-0 rounded-lg" />
    </div>
  );
}

export default NotificationListSkeleton;
