import AuthSigninForm from "@/features/auth/components/AuthSigninForm";

function page() {
  return (
    <div className="conatainer mx-auto px-2 flex gap-8 flex-col items-center justify-center py-12">
      <AuthSigninForm />
    </div>
  );
}

export default page;
