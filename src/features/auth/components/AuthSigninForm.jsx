"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircleIcon, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInUser } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/utils/schema";
import FormsButton from "@/components/ui/FormsButton";
import Input from "@/components/ui/Input";

function AuthSigninForm() {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      // just during development
      password: "12345678",
    },
  });
  // local state

  async function onSubmit(data) {
    await signInUser(data);
  }
  return (
    <>
      {/* form body */}
      <div className="self-start">
        {/* <button className="flex tracking-wider items-center rounded-full gap-1 hover:opacity-90 hover:bg-hover active:opacity-100 active:scale-103 px-3 py-1.5 bg-black/80 text-gray-50 transition-all duration-200">
          <ArrowLeftCircleIcon size={23} />
          <span>Back to Home</span>
        </button> */}
      </div>
      <div className="rounded-xl border border-border p-4 bg-card shadow-sm">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl tracking-tight font-bold text-primary font-sora">
            Sign in
          </h2>
          <p className="text-muted-foreground">
            Welcome back, please sign in to your account.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 md:min-w-md"
        >
          <Input
            icon={<Mail size={18} className="text-muted-foreground" />}
            label="Email"
            type="text"
            error={errors.email}
            {...register("email")}
          />
          <Input
            icon="password"
            label="Password"
            error={errors.password}
            {...register("password")}
          />
          <div className="flex flex-col gap-2">
            <FormsButton
              disabled={isSubmitting}
              type="submit"
              style="authForm"
              ariaLabel="Sign in account"
            >
              {" "}
              Sign in
            </FormsButton>
            <div className="mx-auto">
              <span className="text-sm text-muted-foreground">
                Don’t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-primary hover:text-hover transition-all duration-200 hover:underline"
                >
                  Register
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AuthSigninForm;
