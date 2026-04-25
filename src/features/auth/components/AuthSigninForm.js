"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircleIcon, Eye, EyeClosed, Mail } from "lucide-react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

import Button from "@/components/ui/Button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { signInUser } from "@/lib/actions/auth";
import { signInSchema } from "@/lib/utils/schema";

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
      password: "npx prisma generate",
    },
  });
  // local state
  const [showPassword, setShowPassword] = useState(false);
  async function onSubmit(data) {
    const response = await signInUser(data);
    if (response?.error) {
      toast.error("Invalid email or password", {
        className: "bg-blue-600 text-white",
      });
    } else {
      toast.success(response?.success);
      router.push("/blogs");
    }
  }
  return (
    <>
      {/* form body */}
      <div className="self-start">
        <button className="flex tracking-wider items-center rounded-full gap-1 hover:opacity-90 hover:bg-hover active:opacity-100 active:scale-103 px-3 py-1.5 bg-black/80 text-gray-50 transition-all duration-200">
          <ArrowLeftCircleIcon size={23} />
          <span>Back to Home</span>
        </button>
      </div>
      <div className="border-1 border-black rounded-xl p-4 shadow-sm">
        <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-accent mb-8 font-sora">
          Sign in your Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 md:min-w-md"
        >
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="email"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Email
            </label>
            <div className="relative">
              <input
                {...register("email")}
                type="text"
                className={`${errors.email ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
              />
              <span className="absolute right-2 top-[50%] -translate-y-[50%]">
                <Mail size={18} />
              </span>
            </div>
            <span className="flex">
              {errors.email && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.email.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="password"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Password
            </label>
            <div className="relative">
              <input
                {...register("password")}
                type={`${showPassword ? "text" : "password"}`}
                className={`${errors.password ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
              />
              <span
                tabIndex="1"
                onClick={() => setShowPassword((show) => !show)}
                className="absolute right-2 top-[50%] -translate-y-[50%]"
              >
                {showPassword ? <EyeClosed size={20} /> : <Eye size={20} />}
              </span>
            </div>
            <span className="flex">
              {errors.password && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.password.message}
                </p>
              )}
            </span>
          </div>

          <div className="mx-auto flex flex-col gap-2">
            <Button
              disabled={isSubmitting}
              type="submit"
              style="authForm"
              ariaLabel="Sign in account"
            >
              {" "}
              Sign in
            </Button>

            <div>
              <span className="text-sm text-gray-600">
                Don’t have an account?{" "}
                <Link
                  href="/auth/register"
                  className="text-accent hover:text-hover transition-all duration-200 hover:underline"
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
