import DeleteButton from "@/app/components/DeleteButton";
import NavigateBackButton from "@/app/components/NavigateBackButton";
import PostDetails from "@/app/components/PostDetails";
import PostDetailsSkeleton from "@/app/components/skeletons/PostDetailsSkeleton";
import { getPostBySlug } from "@/app/lib/actions/post";
import getCurrentUser from "@/app/lib/getUser";
import { Pencil } from "lucide-react";

import Link from "next/link";
import { Suspense } from "react";

async function page({ params }) {
  const { slug } = await params;
  const userDataPromise = getCurrentUser();
  const postsDataPromise = getPostBySlug(slug);

  // Await them only when you need the values
  const [user, post] = await Promise.all([userDataPromise, postsDataPromise]);

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
                  <DeleteButton post={post} style="secondary">
                    <span className="text-red-500 font-semibold tracking-wide">
                      Delete
                    </span>
                  </DeleteButton>
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
