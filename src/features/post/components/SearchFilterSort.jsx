"use client";
import { Filter, Search, SortAscIcon } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function SearchFilterSort() {
  // local states
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("");
  const [sort, setSort] = useState("");

  // navigators
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathName = usePathname();

  // Search
  useEffect(() => {
    const timer = setTimeout(() => {
      const params = new URLSearchParams(searchParams.toString());
      if (query.length > 3) {
        params.delete("page");
        params.set("search", query);
      } else {
        params.delete("search");
      }
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
    }, 2000);

    return () => clearTimeout(timer);
  }, [query]);

  // Filter
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (filter !== "Choose a filter") {
      params.delete("page");
      params.set("filter", filter);
    } else {
      params.delete("filter");
    }
    if (filter !== "")
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, [filter]);

  //  Sort
  useEffect(() => {
    const params = new URLSearchParams(searchParams.toString());
    if (sort !== "Sort by") {
      params.delete("page");
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    if (sort !== "")
      router.replace(`${pathName}?${params.toString()}`, { scroll: false });
  }, [sort]);

  return (
    <div className="grid gap-4 grid-cols-2 md:grid-cols-4">
      <div className="flex gap-0.5 flex-col relative w-full col-span-2">
        {/* search */}
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          id="search"
          name="search"
          className="bg-input dark:bg-input/30 border border-border pl-8 w-full peer z-20 text-sm rounded-lg px-3 py-2 focus:outline-none focus:ring-1 ring-ring"
          placeholder=" "
        />
        <label
          htmlFor="search"
          className="transition-all duration-200 absolute peer-[:not(:placeholder-shown)]:-top-0.5 peer-[:not(:placeholder-shown)]:left-2 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:bg-primary peer-[:not(:placeholder-shown)]:rounded-lg peer-[:not(:placeholder-shown)]:text-gray-50 peer-[:not(:placeholder-shown)]:px-1 peer-focus:px-1 peer-focus:-top-0.5 peer-focus:bg-primary peer-focus:text-xs z-40 peer-focus:rounded-lg peer-focus:text-gray-50 top-[50%] -translate-y-[50%] left-8 peer-focus:left-2 font-sora text-muted-foreground tracking-wide text-sm"
        >
          Search: Enter articles title..
        </label>
        <span className="absolute text-muted-foreground z-30 left-1 top-[50%] -translate-y-[50%] peer-focus:text-primary">
          <Search />
        </span>
      </div>
      {/* filter */}

      <Select onValueChange={(value) => setFilter(value)}>
        <SelectTrigger className="w-full border-border" size="lg">
          <SelectValue placeholder="Select a Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Categories</SelectLabel>
            <SelectItem value="all">All</SelectItem>
            <SelectItem value="react">React</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>

      <Select onValueChange={(value) => setSort(value)}>
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

export default SearchFilterSort;
