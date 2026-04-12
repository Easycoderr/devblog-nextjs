import Form from "@/app/components/Form";
import { getPost } from "@/app/lib/actions/post";

async function page({ params }) {
  const { id } = await params;
  const postData = await getPost(id);
  return (
    <div className="conatainer w-full mx-auto px-2 2xl:px-10 flex gap-8 flex-col items-center py-12">
      <Form postData={postData} />
    </div>
  );
}

export default page;
