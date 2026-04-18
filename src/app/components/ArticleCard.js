"use client";

import Image from "next/image";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { ArrowRight, Calendar, Pencil, Trash2Icon } from "lucide-react";

import Link from "next/link";
import ConfirmDeleteAction from "./ConfirmDeleteAction";
import dynamic from "next/dynamic";

const DeleteButton = dynamic(() => import("./DeleteButton"), {
  ssr: false,
  loading: () => <div className="bg-red-100 p-2 rounded-lg w-9 h-9" />,
});

function ArticleCard({ post, user }) {
  return (
    <div className="flex overflow-hidden hover:scale-100 transition-all duration-all flex-col gap-4 shadow hover:shadow-lg rounded-lg">
      {/* image */}
      <Image
        className="bg-contain"
        src="/images/img1.png"
        width={1000}
        height={1000}
        alt={"react"}
      />
      {/* content */}
      <div className="space-y-3 p-3 mt-auto">
        <h3 className="text-xl tracking-tight font-semibold">{post.title}</h3>
        {/* description */}
        <p className="text-sm text-text-muted">
          {post.description.slice(0, 80)}...
        </p>
        <div className="flex flex-col gap-4 text-sm mt-auto">
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
                {new Date(post.createdAt).toLocaleDateString()} •{" "}
                {post.readTime} min read
              </span>
            </span>
          </div>
          <div className="flex justify-between">
            <Link
              href={`/blogs/${post.slug}`}
              className="group flex text-md items-center gap-2 bg-accent px-3 py-1.5 rounded-full text-gray-50 transition-all duration-200 active:scale-105 hover:bg-hover"
            >
              Read Article{" "}
              <ArrowRight className="group-hover:translate-x-0.5 transition duration-200" />
            </Link>
            {/* Display edit/delete options only if the current user is the author */}
            {user?.id === post.authorId && (
              <div className="flex gap-2">
                {/* edit */}
                <Link
                  href={`/blogs/edit/${post.id}`}
                  className="bg-indigo-100 p-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-indigo-200 transition-all duration-200 "
                >
                  <Pencil size={18} className="text-accent" />
                </Link>
                {/* delete */}

                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <DeleteButton />
                  </AlertDialogTrigger>
                  <AlertDialogContent size="sm">
                    <AlertDialogHeader>
                      <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                        <Trash2Icon />
                      </AlertDialogMedia>
                      <AlertDialogTitle>Delete {post.title}?</AlertDialogTitle>
                      <AlertDialogDescription>
                        Are you sure? This will permanently delete this post.
                        This action cannot be undone
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel variant="outline">
                        Cancel
                      </AlertDialogCancel>
                      <ConfirmDeleteAction post={post} />
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ArticleCard;
