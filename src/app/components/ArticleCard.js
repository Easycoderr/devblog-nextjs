"use client";

import Image from "next/image";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  ArrowRight,
  Calendar,
  EllipsisVertical,
  LucideShare2,
  ThumbsUp,
} from "lucide-react";

import Link from "next/link";

import DeleteAlertDialog from "./DeleteAlertDialog";

// const DeleteButton = dynamic(() => import("./DeleteButton"), {
//   ssr: false,
//   loading: () => <div className="" />,
// });

function ArticleCard({ post, user }) {
  return (
    <div className="group relative flex overflow-hidden transition-all duration-all flex-col gap-4 shadow hover:shadow-lg rounded-lg">
      {/* image */}
      <Image
        className="bg-contain object-cover"
        src="/images/img1.png"
        width={1000}
        height={1000}
        alt={"react"}
      />
      {/* post actions */}
      <div className="absolute top-0 right-0">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="icon">
              <EllipsisVertical size={30} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuItem>Save for later</DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            {/* Display edit/delete options only if the current user is the author */}
            {user?.id === post.authorId && (
              <div>
                {/* edit */}
                <DropdownMenuItem asChild onSelect={(e) => e.preventDefault()}>
                  <Link
                    href={`/blogs/edit/${post.id}`}
                    className="flex gap-1 w-full group-data-[highlighted]/dropdown-menu-item:text-indigo-50 hover:cursor-default"
                  >
                    Edit
                  </Link>
                </DropdownMenuItem>
                {/* delete */}
                <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
                  <DeleteAlertDialog post={post} />
                </DropdownMenuItem>
              </div>
            )}
            <DropdownMenuItem disabled>Report</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      {/* content */}
      <div className="space-y-3 p-3 mt-auto">
        <h3 className="text-xl mb-1 tracking-tight font-semibold">
          {post.title}
        </h3>
        {/* description */}
        <div className="flex items-center gap-3">
          <span className="flex text-xs items-center">
            <span
              className={`${post.category === "React" ? "text-blue-400" : "text-yellow-500"}`}
            >
              #{post.category}
            </span>
          </span>
          <span className="flex items-center gap-1">
            <Calendar className="text-green-500" size={17} />
            <span className="text-xs text-gray-400 mt-1">
              {new Date(post.createdAt).toLocaleDateString()} • {post.readTime}{" "}
              min read
            </span>
          </span>
        </div>
        <p className="text-sm text-slate-600">
          {post.description.slice(0, 80)}...
        </p>
        <div className="flex flex-col gap-4 text-sm mt-auto">
          <div className="flex justify-between">
            <Link
              href={`/blogs/${post.slug}`}
              className="group flex text-md items-center gap-2 bg-accent px-3 py-1.5 rounded-full text-gray-50 transition-all duration-200 active:scale-105 hover:bg-hover"
            >
              Read Article <ArrowRight className="transition duration-200" />
            </Link>
            {/* like and share */}
            <div className="flex gap-2 items-center place-content-center text-sm">
              <button className="mt-0.5 flex gap-1 items-center">
                <span className="mt-0.5 font-medium text-text-muted">10</span>
                <LucideShare2 size={20} className="text-slate-600" />
              </button>
              <button className="flex gap-1 items-center">
                <span className="mt-1.5 font-medium text-text-muted">80</span>
                <ThumbsUp
                  className="text-indigo-500 active:scale-105 transition-all duration-200"
                  size={20}

                  // fill="rgb(59 130 246 / var(--tw-text-opacity, 1))"
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
