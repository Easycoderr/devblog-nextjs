import Form from "@/features/post/components/Form";
export const metadata = {
  title: "Create blog",
};
async function page() {
  return (
    <div className="container w-full mx-auto px-2 2xl:px-10 flex gap-8 flex-col items-center justify-end py-12">
      <Form />
    </div>
  );
}

export default page;
