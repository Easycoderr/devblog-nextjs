"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera } from "lucide-react";
import { useForm } from "react-hook-form";
import { registerSchema } from "@/lib/utils/schema";
import Link from "next/link";
import { registerUser } from "@/lib/actions/auth";
import { redirect } from "next/navigation";
import { toast } from "sonner";
import FormsButton from "@/components/ui/FormsButton";
import Input from "@/components/ui/Input";
import { useEffect } from "react";
import Image from "next/image";

function AuthRegisterForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    reset,
    watch,
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

  const fileList = watch("profilePicture");
  const file = fileList && fileList.length > 0 ? fileList[0] : null;
  const previewUrl = file ? URL.createObjectURL(file) : null;

  useEffect(() => {
    if (!previewUrl) return;
    return () => {
      if (previewUrl) URL.revokeObjectURL(previewUrl);
    };
  }, [previewUrl]);

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
      <div className="border border-border rounded-xl p-4 bg-card shadow-sm min-w-full md:min-w-lg md:max-w-[38rem]">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl tracking-tight font-bold text-primary font-sora">
            Create account
          </h2>
          <p className="text-muted-foreground">
            Join our community of developers
          </p>
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-3">
          {/* profile picture */}
          <div className="mx-auto flex flex-col items-center justify-center mb-6">
            <label
              htmlFor="profile-picture"
              className={`group relative flex items-center justify-center overflow-hidden cursor-pointer ${errors.profilePicture ? "border-red-500" : "border-border"} ${previewUrl && "ring-ring ring"} has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 bg-input h-36 w-36 border rounded-full focus:outline-none`}
            >
              <input
                id="profile-picture"
                type="file"
                className="sr-only"
                accept="image/*"
                {...register("profilePicture")}
              />
              {previewUrl ? (
                <Image
                  fill
                  sizes="144px"
                  className="object-cover"
                  src={previewUrl}
                  alt={"User picture"}
                />
              ) : (
                <div>
                  <Camera
                    className="group-hover:text-primary/50 text-muted-foreground"
                    size={42}
                  />
                </div>
              )}
            </label>
            <div className="flex flex-col text-center">
              <h3 className="break-all text-foreground text-md font-medium tracking-wide">
                Profile picture
              </h3>
              <p className="text-muted-foreground text-xs">
                JPG, PNG, Max size 4MB
              </p>
            </div>
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
          <Input
            error={errors.email}
            label="Email"
            type="email"
            {...register("email")}
          />
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
          <div className="flex flex-col gap-2">
            <FormsButton
              disabled={isSubmitting || !isDirty}
              isSubmiting={isSubmitting}
              type="submit"
              style="authForm"
              ariaLabel="Register account"
            >
              {" "}
              Register
            </FormsButton>

            <div className="mx-auto">
              <span className="text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link
                  href="/auth/signin"
                  className="text-primary hover:text-hover transition-all duration-200 hover:underline"
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
