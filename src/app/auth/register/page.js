import AuthRegisterForm from "@/features/auth/components/AuthRegisterForm";

function page() {
  return (
    <div className="conatainer mx-auto px-2 flex gap-8 flex-col items-center justify-center py-12">
      <AuthRegisterForm />
    </div>
  );
}

export default page;
