"use client";
import { Button } from "@/components/ui/button";
import Input from "@/components/ui/Input";
import { signInSchema } from "@/lib/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import resetPassword from "@/lib/actions/resetPassword";
import { useRouter } from "next/navigation";

const resetPasswordSchema = signInSchema.pick({ password: true });
function ResetPasswordForm({ token }) {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
    },
  });
  async function onSubmit(data) {
    const response = await resetPassword(token, data.password);
    if (response.success) {
      toast.success(response.message);
      router.replace("/auth/signin");
    }
    if (!response.success) {
      toast.error(response.message);
    }
  }

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
            label="Password"
            icon="password"
            error={errors.password}
            {...register("password")}
          />
        </div>
        <div className="flex flex-col gap-3 mt-6">
          <Button
            disabled={isSubmitting || !isDirty}
            className={`text-md p-5 text-indigo-50 hover:opacity-75 ${isSubmitting ? "opacity-60 cursor-not-allowed" : "cursor-pointer "}`}
            type="submit"
          >
            {isSubmitting ? "Submiting..." : "Reset password"}
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

export default ResetPasswordForm;
