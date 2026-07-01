import AuthSigninForm from "@/features/auth/components/AuthSigninForm";
import VerificationToast from "@/features/auth/components/VerificationToast";
import { toast } from "sonner";

async function page({ searchParams }) {
  const { verified } = await searchParams;
  if (verified) {
    <VerificationToast />;
  }
  return (
    <div className="conatainer mx-auto px-2 flex gap-8 flex-col items-center justify-center py-12">
      <AuthSigninForm />
    </div>
  );
}

export default page;
