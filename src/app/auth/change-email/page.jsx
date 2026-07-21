import ErrorCard from "@/components/ui/ErrorCard";
import VerificationFailed from "@/features/auth/components/VerificationFailed";
import verifyChangeEmail from "@/lib/actions/verify/verifyChangeEmail";
import UpdateSuccess from "@/features/settings/components/change-email/UpdateSuccess";
import { SessionProvider } from "next-auth/react";
import { auth } from "@/auth";

async function page({ searchParams }) {
  const { token } = await searchParams;
  const session = await auth();
  if (!token) {
    return (
      <div className="flex items-center justify-center min-h-150">
        <VerificationFailed message="Missing verification token in the URL." />
      </div>
    );
  }
  const response = await verifyChangeEmail(token);
  if (response.error || !response.success) {
    return (
      <ErrorCard
        title="Error"
        description={response.message}
        buttonText="Back to Settings"
        href="/settings/account"
      />
    );
  }
  if (response.success && response.newEmail) {
    return (
      <SessionProvider session={session}>
        <UpdateSuccess email={response.newEmail} message={response.message} />;
      </SessionProvider>
    );
  }
  return <div>Something went wrong.</div>;
}

export default page;
