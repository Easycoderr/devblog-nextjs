"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeftCircleIcon, Image } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/utils/schema";
import Link from "next/link";
import { registerUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import FormsButton from "@/components/ui/FormsButton";
import Input from "@/components/ui/Input";

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
      profilePicture: "",
    },
  });
  async function onSubmit(data) {
    //  Create a FormData container to safely transport files
    const formData = new FormData();

    formData.append("password", data.password);
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("email", data.email);

    if (data.profilePicture && data.profilePicture.length > 0) {
      const fileBinary = data.profilePicture[0]; // Get item 0 from FileList
      formData.append("profilePicture", fileBinary);
    }

    const response = await registerUser(formData);
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
        {/* <button className="flex tracking-wider items-center rounded-full gap-1 hover:opacity-90 hover:bg-hover active:opacity-100 active:scale-103 px-3 py-1.5 bg-black/80 text-gray-50 transition-all duration-200">
          <ArrowLeftCircleIcon size={23} />
          <span>Back to Home</span>
        </button> */}
      </div>
      <div className="border border-gray-200 rounded-xl p-4 shadow-sm min-w-full md:min-w-lg md:max-w-xl">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl tracking-tight font-bold text-accent font-sora">
            Create account
          </h2>
          <p className="text-gray-600">Join our community of developers</p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          <div className="flex flex-col col-span-2 gap-1 w-full">
            <label
              htmlFor="profilePicture"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Profile picture
            </label>
            <div className="relative">
              <input
                {...register("profilePicture")}
                type="file"
                className={`${errors.profilePicture ? "border-red-500 focus:border-red-500" : " border-gray-400 focus:ring focus:ring-accent"} p-2 border rounded-lg w-full text-sm focus:outline-none`}
                accept="image/*"
              />
              <span className="absolute right-2 top-[50%] -translate-y-[50%]">
                <Image className="text-gray-500" />
              </span>
            </div>
            <span className="flex">
              {errors.profilePicture && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.profilePicture.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col md:flex-row gap-3">
            <Input
              error={errors.firstName}
              label="First Name"
              {...register("firstName")}
            />
            <Input
              error={errors.lastName}
              label="Last Name"
              {...register("lastName")}
            />
          </div>
          <Input error={errors.email} label="Email" {...register("email")} />

          <Input
            error={errors.password}
            label="Password"
            icon="password"
            {...register("password")}
          />
          <Input
            error={errors.confirmPassword}
            label="Confirm password"
            icon="password"
            {...register("confirmPassword")}
          />

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
