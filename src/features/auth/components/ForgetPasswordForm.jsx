"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { signInSchema } from "@/lib/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CheckEmail from "./CheckEmail";
import sendResetPassword from "@/lib/actions/sendResetPassword";

const forgotPasswordSchema = signInSchema.pick({ email: true });
function ForgetPasswordForm() {
  const [checkEmail, setCheckEmail] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  async function onSubmit(data) {
    const response = await sendResetPassword(data.email);
    if (response.success) {
      toast.success(response.message);
      setCheckEmail(response.email);
    }
    if (!response.success) {
      toast.error(response.message);
    }
  }
  if (checkEmail)
    return (
      <CheckEmail
        email={checkEmail}
        setCheckEmail={setCheckEmail}
        mode="reset"
      />
    );
  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-xl border w-full max-w-xl  border-border p-4 bg-card shadow-sm my-24"
    >
      <div className="space-y-2">
        <h2 className="flex items-center gap-2 mb-4 text-xl tracking-tight font-bold text-primary font-sora">
          <span>Reset your password</span>
        </h2>
        <div className="space-y-0">
          <Input
            label="Email"
            type="text"
            icon={<Mail />}
            error={errors.email}
            {...register("email")}
          />
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            disabled={isSubmitting || !isDirty}
            className={`text-md p-5 text-indigo-50 hover:opacity-75 ${isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer "}`}
            type="submit"
          >
            {isSubmitting ? "Sending..." : "Send reset instructions"}
          </Button>
          <Link
            className="p-2 text-center w-full inline-block bg-black/70 text-white rounded-lg hover:opacity-75"
            href="signin"
          >
            Back to Sign In
          </Link>
        </div>
      </div>
    </form>
  );
}

export default ForgetPasswordForm;
