import verifyToken from "@/lib/actions/verify email/verifyToken";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";

async function page({ searchParams }) {
  const { token } = await searchParams;
  const verificationToken = await verifyToken(token);
  if (!verificationToken.success) {
    return (
      <div className="w-full min-h-[600px] flex items-center justify-center">
        <div className="flex flex-col gap-4 items-center bg-card text-card-foreground shadow-md p-8 rounded-xl max-w-md text-center">
          <AlertCircle className="size-14 text-brand-danger" />

          <div className="space-y-1">
            <h2 className="text-xl font-semibold tracking-tight">
              Verification Failed
            </h2>
            <p className="text-muted-foreground text-base">
              {verificationToken?.message ||
                "Your verification link has expired or is invalid."}
            </p>
          </div>

          <Link
            href="/auth/signin"
            className="flex gap-2 text-white bg-brand-danger hover:bg-brand-danger/90 transition-colors rounded-lg px-4 py-2 mt-2 items-center tracking-wide font-medium"
          >
            <ArrowLeft className="size-4" />
            <span>Back to Sign In</span>
          </Link>
        </div>
      </div>
    );
  }
}

export default page;
