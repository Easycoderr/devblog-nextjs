import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
type VerificationFailedProps = {
  message?: string;
  buttonTitle?: string;
  href?: string;
};
function VerificationFailed({
  message,
  buttonTitle = "Back to Sign In",
  href = "/auth/signin",
}: VerificationFailedProps) {
  return (
    <div className="flex flex-col gap-4 items-center bg-card text-card-foreground shadow-md p-8 rounded-xl max-w-md text-center">
      <AlertCircle className="size-14 text-brand-danger" />

      <div className="space-y-1">
        <h2 className="text-xl font-semibold tracking-tight">
          Verification Failed
        </h2>
        <p className="text-muted-foreground text-base">
          {message || "Your verification link has expired or is invalid."}
        </p>
      </div>

      <Link
        href={href}
        className="flex gap-2 text-white bg-brand-danger hover:bg-brand-danger/90 transition-colors rounded-lg px-4 py-2 mt-2 items-center tracking-wide font-medium"
      >
        <ArrowLeft className="size-4" />
        <span>{buttonTitle}</span>
      </Link>
    </div>
  );
}

export default VerificationFailed;
