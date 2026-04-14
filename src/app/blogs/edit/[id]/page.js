import Form from "@/app/components/Form";
import { getPost } from "@/app/lib/actions/post";
import { notFound } from "next/navigation";

async function page({ params }) {
  const { id } = await params;
  const post = await getPost(id);
  if (!post) {
    notFound();
  }
  return (
    <div className="conatainer w-full mx-auto px-2 2xl:px-10 flex gap-8 flex-col items-center py-12">
      <Form postData={post} />
    </div>
  );
}

export default page;
