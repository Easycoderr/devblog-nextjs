"use client";
import { Button } from "@/components/ui/button";
import resendMail from "@/lib/actions/resendMail";
import { MailCheck } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

function CheckEmail({ email, setCheckEmail }) {
  async function handleResendMail() {
    const result = await resendMail(email);
    if (result?.success) {
      toast.success(`Verification email sent to ${email}`);
    }
  }
  return (
    <div className="rounded-xl border border-border p-4 bg-card shadow-sm">
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 mb-4 text-3xl tracking-tight font-bold text-primary font-sora">
          <MailCheck className="size-8" />
          <span>Check your email</span>
        </h2>
        <p className="text-muted-foreground">
          We&apos;ve sent a verification link to
        </p>
        <p className="text-muted-foreground">{email}</p>
        <p className="text-muted-foreground">
          Please click the link to activate your account.
        </p>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            onClick={handleResendMail}
            className="text-md text-indigo-50 cursor-pointer hover:opacity-75"
          >
            Resend Email
          </Button>
          <Link
            className="p-1 text-center w-full inline-block bg-black/80 text-white rounded-lg hover:opacity-75"
            href="/auth/signin"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CheckEmail;
