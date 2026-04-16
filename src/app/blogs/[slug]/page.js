import DeleteButton from "@/app/components/DeleteButton";
import NavigateBackButton from "@/app/components/NavigateBackButton";
import PostDetails from "@/app/components/PostDetails";
import PostDetailsSkeleton from "@/app/components/skeletons/PostDetailsSkeleton";
import { getPostBySlug } from "@/app/lib/actions/post";
import getCurrentUser from "@/app/lib/getUser";
import { Pencil, Trash2Icon } from "lucide-react";

import Link from "next/link";
import { notFound } from "next/navigation";
import { Suspense } from "react";

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
import ConfirmDeleteAction from "@/app/components/ConfirmDeleteAction";
async function page({ params }) {
  const { slug } = await params;
  const userDataPromise = getCurrentUser();
  const postsDataPromise = getPostBySlug(slug);

  // Await them only when you need the values
  const [user, post] = await Promise.all([userDataPromise, postsDataPromise]);

  if (!post) {
    notFound();
  }

  return (
    <div className="min-h-screen">
      <div className="container 2xl:px-10 px-2 py-10 mx-auto">
        <div className="">
          <div className="flex flex-col gap-6">
            <div className="flex justify-between">
              <NavigateBackButton>Back to blogs</NavigateBackButton>
              {user?.id === post.authorId && (
                <div className="flex gap-2">
                  {/* edit */}
                  <Link
                    href={`/blogs/edit/${post.id}`}
                    className="flex gap-2 items-center bg-indigo-100 px-4 py-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-indigo-200 transition-all duration-200 "
                  >
                    <Pencil size={18} className="text-accent" />
                    <span className="text-accent font-semibold tracking-wide">
                      Edit
                    </span>
                  </Link>
                  {/* delete */}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <DeleteButton variant="secondary">
                        <span className="text-red-500 font-semibold tracking-wide">
                          Delete
                        </span>
                      </DeleteButton>
                    </AlertDialogTrigger>
                    <AlertDialogContent size="sm">
                      <AlertDialogHeader>
                        <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                          <Trash2Icon />
                        </AlertDialogMedia>
                        <AlertDialogTitle>
                          Delete {post.title}?
                        </AlertDialogTitle>
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
            {/* article slug */}
            <Suspense fallback={<PostDetailsSkeleton />}>
              <PostDetails post={post} />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
