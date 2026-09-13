import VerificationFailed from "@/features/auth/components/VerificationFailed";
import verifyToken from "@/lib/actions/verify/verifyToken";

async function page({ searchParams }: { searchParams: { token: string } }) {
  const { token } = searchParams;
  const verificationToken = await verifyToken(token);
  if (!verificationToken) {
    return (
      <div className="w-full min-h-150 flex items-center justify-center">
        <VerificationFailed message="Something went wrong failed to verify Email, please try again!" />
      </div>
    );
  }
  if (!verificationToken.success) {
    return (
      <div className="w-full min-h-150 flex items-center justify-center">
        <VerificationFailed message={verificationToken.message} />
      </div>
    );
  }
}

export default page;
