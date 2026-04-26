"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircleIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/utils/schema";
import Link from "next/link";
import { registerUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import FormsButton from "@/components/ui/FormsButton";

function AuthRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors },
    reset,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      firstName: "",
      email: "",
      password: "",
      confirmPassword: "",
      lastName: "",
    },
  });
  async function onSubmit(data) {
    const response = await registerUser(data);
    if (response.success) {
      redirect("signin");
    } else if (response.error) {
      toast.error(response.error);
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
          Create your Account
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3 md:min-w-xl"
        >
          <div className="flex flex-col md:flex-row gap-3">
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="firstName"
                className="text-gray-600 font-semibold tracking-wide text-sm"
              >
                First Name
              </label>
              <input
                type="text"
                className={`${errors.firstName ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
                {...register("firstName")}
              />
              <span className="flex">
                {errors.firstName && (
                  <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                    {errors.firstName.message}
                  </p>
                )}
              </span>
            </div>
            <div className="flex flex-col gap-1 w-full">
              <label
                htmlFor="lastName"
                className="text-gray-600 font-semibold tracking-wide text-sm"
              >
                Last Name
              </label>
              <input
                type="text"
                className={`${errors.lastName ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
                {...register("lastName")}
              />
              <span className="flex">
                {errors.lastName && (
                  <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                    {errors.lastName.message}
                  </p>
                )}
              </span>
            </div>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="email"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Email
            </label>
            <input
              {...register("email")}
              type="text"
              className={`${errors.email ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
            />
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
            <input
              {...register("password")}
              type="password"
              className={`${errors.password ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
            />
            <span className="flex">
              {errors.password && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.password.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="confirmPassword"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Confirm password
            </label>
            <input
              {...register("confirmPassword")}
              type="password"
              className={`${errors.confirmPassword ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
            />
            <span className="flex">
              {errors.confirmPassword && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.confirmPassword.message}
                </p>
              )}
            </span>
          </div>
          <div className="mx-auto flex flex-col gap-2">
            <FormsButton
              disabled={isSubmitting}
              type="submit"
              style="authForm"
              ariaLabel="Register account"
            >
              {" "}
              Register
            </FormsButton>

            <div>
              <span className="text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-accent hover:text-hover transition-all duration-200 hover:underline"
                >
                  Sign in
                </Link>
              </span>
            </div>
          </div>
        </form>
      </div>
    </>
  );
}

export default AuthRegisterForm;
