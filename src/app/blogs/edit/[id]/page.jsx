import Form from "@/features/post/components/Form";
import { getPost } from "@/lib/actions/post";
import getCurrentUser from "@/lib/getUser";
import { notFound } from "next/navigation";
export async function generateMetadata({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  return {
    title: `Edit: ${post.title}`,
    description: post.description,
  };
}
async function page({ params }) {
  const { id } = await params;
  const [post, user] = await Promise.all([getPost(id), getCurrentUser()]);
  if (!post) {
    notFound();
  }

  if (post.authorId !== user?.id) {
    return (
      <div className="bg-destructive/10 text-destructive text-lg inline-block mx-auto my-auto px-4 py-2 rounded-lg">
        Access Denied. You do not own this post !
      </div>
    );
  }
  return (
    <div className="conatainer w-full mx-auto px-2 2xl:px-10 flex gap-8 flex-col items-center py-12">
      <Form postData={post} />
    </div>
  );
}

export default page;
