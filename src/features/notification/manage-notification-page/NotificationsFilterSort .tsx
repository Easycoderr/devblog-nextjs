"use client";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
type FilterType = "all" | "read" | "unread";
type SortType = "oldest" | "newest";
function NotificationsFilterSort() {
  const [filter, setFilter] = useState<FilterType>();
  const [sort, setSort] = useState<SortType>();
  const searchParams = useSearchParams();
  const pathName = usePathname();
  const router = useRouter();
  // sort
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort === "newest" || sort === "oldest") {
      params.set("sort", sort);
      params.set("take", "8");
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
  }, [sort]);
  // filter
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter === "all" || filter === "read" || filter === "unread") {
      params.set("filter", filter);
      params.set("take", "8");
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }
  }, [filter]);
  console.log("SearchParans:", searchParams.get("filter"));
  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4 mb-3">
      {/* filter */}
      <Select onValueChange={(value: FilterType) => setFilter(value)}>
        <SelectTrigger className="w-full border-border" size="lg">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="read">Read</SelectItem>
            <SelectItem value="unread">Unread</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value: SortType) => setSort(value)}>
        <SelectTrigger className="w-full border-border" size="lg">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Sort</SelectLabel>
            <SelectItem value="newest">Newest</SelectItem>
            <SelectItem value="oldest">Oldest</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}

export default NotificationsFilterSort;
