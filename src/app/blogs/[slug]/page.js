import PostDetails from "@/app/components/PostDetails";
import PostDetailsHeader from "@/app/components/PostDetailsHeader";
import PostDetailsSkeleton from "@/app/components/skeletons/PostDetailsSkeleton";
import { getPostBySlug } from "@/app/lib/actions/post";
import getCurrentUser from "@/app/lib/getUser";

import { notFound } from "next/navigation";
import { Suspense, use } from "react";

// This imports the component only on the client and avoids the useEffect warning

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
        <PostDetailsHeader user={user} post={post} />
        <div className="">
          <div className="flex flex-col gap-6">
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
