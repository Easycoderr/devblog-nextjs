"use client";
import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

function Pagination({ totalPages, currentPage }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const createPageURL = (pageNumber) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };
  const groupSize = 4;
  const pages = Array.from({ length: totalPages || 0 }, (_, i) => i + 1);
  const jumpStart = Math.floor((currentPage - 1) / groupSize) * groupSize;
  const showPages =
    currentPage > 4 ? pages.slice(jumpStart, jumpStart + 4) : pages.slice(0, 4);
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
      {showPages.map((i) => (
        <PagLink
          currentPage={currentPage}
          pageNumber={i}
          key={i}
          createPageURL={createPageURL}
        />
      ))}

      {currentPage <= totalPages - 1 && totalPages > groupSize && (
        <>
          <span className="text-xl text-accent">...</span>
          <Link
            scroll={false}
            href={createPageURL(totalPages)}
            className={`h-8 w-8 flex items-center justify-center text-accent rounded-full border border-accent hover:bg-hover border-0.5 hover:text-gray-50 text-center transition-all duration-200`}
          >
            {totalPages}
          </Link>
        </>
      )}
      <Link
        scroll={false}
        href={createPageURL(currentPage + 1)}
        disabled={currentPage >= totalPages}
        className={`${currentPage >= totalPages ? "text-gray-500 pointer-events-none" : "text-accent hover:text-hover hover:scale-103 active:scale-95"}  transition-all duration-200`}
      >
        <ArrowRightCircleIcon size={34} />
      </Link>
    </div>
  );
}
function PagLink({ pageNumber, currentPage, createPageURL }) {
  return (
    <Link
      scroll={false}
      href={createPageURL(pageNumber)}
      className={`h-8 w-8 flex items-center justify-center ${pageNumber === currentPage ? "bg-accent  text-gray-50" : "text-accent"} hover:text-gray-50 rounded-full border border-accent hover:bg-hover border-0.5 text-center transition-all duration-200`}
    >
      {pageNumber}
    </Link>
  );
}
export default Pagination;
