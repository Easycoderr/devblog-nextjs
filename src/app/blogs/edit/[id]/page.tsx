import Form from "@/features/post/components/Form";
import { getPost } from "@/lib/actions/post/getPostById";
// import { getPost } from "@/lib/actions/post";
import getCurrentUser from "@/lib/getUser";
import { notFound } from "next/navigation";
type Params = { id?: string };
export async function generateMetadata({ params }: { params: Params }) {
  const { id } = await params;
  if (!id)
    return {
      title: `Page not found`,
      description: "Page not found",
    };
  const post = await getPost(id);
  if (!post)
    return {
      title: `Post not found`,
      description: "Post not found",
    };
  return {
    title: `Edit: ${post?.title}`,
    description: post?.description,
  };
}
async function page({ params }: { params: Params }) {
  const { id } = await params;
  if (!id) {
    return (
      <div className="bg-destructive/10 text-destructive text-lg inline-block mx-auto my-auto px-4 py-2 rounded-lg">
        There is no post, please try again and select your post for editing!
      </div>
    );
  }
  const [post, user] = await Promise.all([getPost(id), getCurrentUser()]);
  if (!post) {
    notFound();
  }

  if (post.authorId !== user?.id) {
    return (
      <div className="bg-destructive/10 text-destructive text-lg inline-block mx-auto my-auto px-4 py-2 rounded-lg">
        Access Denied. You do not own this post!
      </div>
    );
  }
  return (
    <div className="container w-full mx-auto px-2 2xl:px-10 flex gap-8 flex-col items-center py-12">
      <Form postData={post} />
    </div>
  );
}

export default page;
