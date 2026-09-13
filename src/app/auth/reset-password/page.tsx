import ErrorCard from "@/components/ui/ErrorCard";
import ResetPasswordForm from "@/features/auth/components/ResetPasswordForm";
import VerificationFailed from "@/features/auth/components/VerificationFailed";
import verifyResetPasswordToken from "@/lib/actions/verify/verifyResetPasswordToken";

async function page({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;

  const response = await verifyResetPasswordToken(token);
  if (!response) return null;

  return (
    <div className="flex items-center justify-center min-h-150">
      {!response.success ? (
        <VerificationFailed message={response?.message} />
      ) : (
        <ResetPasswordForm token={token} />
      )}
    </div>
  );
}

export default page;
