import PostDetails from "@/features/post/components/PostDetails";
import PostDetailsHeader from "@/features/post/components/PostDetailsHeader";
import PostDetailsSkeleton from "@/features/post/components/skeletons/PostDetailsSkeleton";
import TiptapArticleRenderer from "@/features/post/components/TiptapArticleRenderer";
import ViewTracker from "@/features/post/components/ViewTracker";
import { getPostBySlug } from "@/lib/actions/post/getPostBySlug";
import getCurrentUser from "@/lib/getUser";
import ScrollToComment from "@/providers/ScrollToComment";
import { notFound } from "next/navigation";
import { Suspense } from "react";

type Params = { slug: string };
export async function generateMetadata({
  params,
}: {
  params: Promise<Params>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);
  return {
    title: `Blog: ${slug}`,
    description: post?.description ?? "Blog posts",
  };
}
// This imports the component only on the client and avoids the useEffect warning

async function page({ params }: { params: Promise<Params> }) {
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
      <article className="container 2xl:px-50 px-2 py-10 mx-auto">
        <TiptapArticleRenderer
          content={{
            type: "doc",
            content: [
              {
                type: "heading",
                attrs: { level: 1 },
                content: [{ type: "text", text: "Hello Babe" }],
              },
              {
                type: "paragraph",
                content: [{ type: "text", text: "This is my article." }],
              },
            ],
          }}
        />
        <ViewTracker slug={post.slug} />
        <PostDetailsHeader user={user} post={post} />
        <div className="mt-8">
          <div className="flex flex-col gap-6">
            {/* article slug */}
            <Suspense fallback={<PostDetailsSkeleton />}>
              <PostDetails post={post} />
            </Suspense>
          </div>
        </div>
      </article>
    </div>
  );
}

export default page;
