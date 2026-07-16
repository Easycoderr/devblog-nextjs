import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import VerificationFailed from "@/features/auth/components/VerificationFailed";
import verifyResetPasswordToken from "@/lib/actions/verify/verifyResetPasswordToken";

async function page({ searchParams }) {
  const params = await searchParams;
  const token = params.token;
  const response = await verifyResetPasswordToken(token);

  return (
    <div className="flex items-center justify-center min-h-[600px]">
      {!response.success ? (
        <VerificationFailed message={response?.message} />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </div>
  );
}

export default page;
