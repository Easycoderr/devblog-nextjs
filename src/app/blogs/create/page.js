import Form from "@/app/components/Form";
import NavigateBackButton from "@/app/components/NavigateBackButton";

async function page() {
  return (
    <div className="container w-full mx-auto px-2 2xl:px-10 flex gap-8 flex-col items-center justify-end py-12">
      <Form />
    </div>
  );
}

export default page;
