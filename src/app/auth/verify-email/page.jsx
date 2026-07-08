import VerificationFailed from "@/features/auth/components/VerificationFailed";
import verifyToken from "@/lib/actions/verify-email/verifyToken";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

async function page({ searchParams }) {
  const { token } = await searchParams;
  const verificationToken = await verifyToken(token);
  if (!verificationToken.success) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center">
        <VerificationFailed message={verificationToken.message} />
      </div>
    );
  }
}

export default page;
