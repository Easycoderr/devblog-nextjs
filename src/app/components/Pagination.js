import { ArrowLeftCircleIcon, ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";

function Pagination() {
  return (
    <div className="p-2 flex gap-2">
      <button>
        <ArrowLeftCircleIcon
          className="text-accent hover:text-hover hover:scale-103 active:scale-95 transition-all duration-200"
          size={34}
        />
      </button>
      <Link
        href={"?page=1"}
        className="h-8 w-8  flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        1
      </Link>
      <Link
        href={"?page=1"}
        className="h-8 w-8  flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        2
      </Link>
      <Link
        href={"?page=1"}
        className="h-8 w-8  flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        3
      </Link>
      <Link
        href={"?page=1"}
        className="h-8 w-8  flex items-center justify-center  rounded-full bg-accent text-gray-50 text-center"
      >
        4
      </Link>
      <span className="text-xl text-accent">...</span>
      <button>
        <ArrowRightCircleIcon
          className="text-accent hover:text-hover hover:scale-103 active:scale-95 transition-all duration-200"
          size={34}
        />
      </button>
    </div>
  );
}

export default Pagination;
