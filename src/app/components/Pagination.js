"use client";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function Pagination({ totalPages }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page")) || 1;

  const createPageURL = (pageNumber) => {
    console.log("hi");
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  return (
    <div className="p-2 flex gap-2">
      <Link
        scroll={false}
        href={createPageURL(currentPage - 1)}
        disabled={currentPage <= 1}
        className={`${currentPage <= 1 ? "text-gray-500 pointer-events-none" : "text-accent hover:text-hover hover:scale-103 active:scale-95 "} transition-all duration-200`}
      >
        <ArrowLeftCircleIcon size={34} />
      </Link>
      <Link
        scroll={false}
        href={createPageURL(1)}
        className="h-8 w-8 flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        1
      </Link>
      <Link
        scroll={false}
        href={createPageURL(2)}
        className="h-8 w-8 flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        2
      </Link>
      <Link
        scroll={false}
        href={createPageURL(3)}
        className="h-8 w-8 flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        3
      </Link>
      <Link
        scroll={false}
        href={createPageURL(4)}
        className="h-8 w-8 flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        4
      </Link>
      <span className="text-xl text-accent">...</span>
      <Link
        scroll={false}
        href={createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${currentPage >= totalPages ? "text-gray-500 pointer-events-none" : "text-accent hover:text-hover hover:scale-103 active:scale-95"} transition-all duration-200`}
      >
        <ArrowRightCircleIcon size={34} />
      </Link>
    </div>
  );
}

export default Pagination;
