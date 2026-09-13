import AuthSigninForm from "@/features/auth/components/AuthSigninForm";
import VerificationToast from "@/features/auth/components/VerificationToast";
import { Suspense } from "react";
async function page() {
  return (
    <div className="conatainer mx-auto px-2 flex gap-8 flex-col items-center justify-center py-12">
      <Suspense fallback={null}>
        <VerificationToast />
      </Suspense>
      <AuthSigninForm />
    </div>
  );
}

export default page;
