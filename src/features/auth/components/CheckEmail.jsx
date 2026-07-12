"use client";
import { Button } from "@/components/ui/button";
import useCountdown from "@/hooks/useCountdown";
import resendMail from "@/lib/actions/resendMail";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

function CheckEmail({ email, setCheckEmail, mode = "verify" }) {
  const router = useRouter();
  const { timeLeft, startTimer } = useCountdown(60);
  const isCoolDown = timeLeft > 0;

  const isResetMode = mode === "reset";
  const linkType = isResetMode ? "Password reset" : "Verification";
  const actionText = isResetMode
    ? "reset your password"
    : "activate your account";
  async function handleResendMail() {
    startTimer();
    toast.success(`${linkType} email sent to ${email}`);
    const response = await resendMail(email, mode);
    if (response?.error) {
      toast.error(response?.message);
    } else if (response?.success === "VERIFIED") {
      setCheckEmail(null);
      router.replace("/auth/signin?verified=true");
    }
  }
  return (
    <div className="rounded-xl border border-border p-4 bg-card shadow-sm my-24">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 mb-4 text-3xl tracking-tight font-bold text-primary font-sora">
          <MailCheck className="size-8" />
          <span>Check your email</span>
        </h2>
        <div className="space-y-0">
          <p className="text-muted-foreground">
            We&apos;ve sent a {linkType} link to
          </p>
          <p className="text-muted-foreground">{email}</p>
          <p className="text-muted-foreground">
            Please click the link to {actionText}.
          </p>
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            disabled={isCoolDown}
            onClick={handleResendMail}
            className={`text-md text-indigo-50 hover:opacity-75 ${isCoolDown ? "opacity-60 cursor-not-allowed" : "cursor-pointer "}`}
          >
            {isCoolDown ? `Resend available in ${timeLeft}s` : "Resend email"}
          </Button>
          <Link
            className="p-1 text-center w-full inline-block bg-black/80 text-white rounded-lg hover:opacity-75"
            href="/auth/signin"
            onClick={() => setCheckEmail(null)}
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;
