import PostDetails from "@/features/post/components/PostDetails";
import PostDetailsHeader from "@/features/post/components/PostDetailsHeader";
import PostDetailsSkeleton from "@/features/post/components/skeletons/PostDetailsSkeleton";
import { getPostBySlug } from "@/lib/actions/post";
import getCurrentUser from "@/lib/getUser";

import { notFound } from "next/navigation";
import { Suspense } from "react";

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `Blog: ${slug}`,
    description: post.description,
  };
}
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
