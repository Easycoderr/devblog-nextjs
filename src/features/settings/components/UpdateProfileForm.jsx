"use client";
import FormsButton from "@/components/ui/FormsButton";
import Input from "@/components/ui/Input";
import MiniSpinner from "@/components/ui/MiniSpinner";
import isUserNameExist from "@/lib/actions/settings/profile/isUserNameExist";
import updateUserProfile from "@/lib/actions/settings/profile/updateUserProfile";
import calcTextRange from "@/lib/utils/calcTextLength";
import { updateProfile } from "@/lib/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Camera, CheckCircle2Icon, XCircle } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function UpdateProfileForm({ user }) {
  const [isValidUserName, setIsValidUserName] = useState(false);
  const [isLoadingForValid, setIsLoadingForValid] = useState(false);
  const { avatarId, avatar, firstName, lastName, bio, userName } = user || {};
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    reset,
    setError,
    clearErrors,
    watch,
  } = useForm({
    resolver: zodResolver(updateProfile),
    mode: "onChange",
    defaultValues: {
      firstName: firstName || "",
      lastName: lastName || "",
      userName: userName || "",
      profilePicture: "",
      bio: bio || "",
    },
  });

  // checking username existing
  const newUserName = watch("userName");

  useEffect(() => {
    let time;
    async function check() {
      const user = await isUserNameExist(newUserName);
      if (user && user.userName !== userName && newUserName.length !== 0) {
        setIsValidUserName(true);
        setError("userName", {
          type: "manual",
          message: "This username is taken.",
        });
      }
      setIsLoadingForValid(false);
    }

    setIsLoadingForValid(true);
    time = setTimeout(() => {
      check();
    }, 3000);

    return () => {
      clearTimeout(time);
      clearErrors("userName");
      setIsLoadingForValid(false);
      setIsValidUserName(false);
    };
  }, [newUserName]);

  const bioChar = watch("bio");

  // prepare avatar for previewUrl
  const fileList = watch("profilePicture");
  const file = fileList && fileList.length > 0 ? fileList[0] : null;
  const previewUrl = file ? URL.createObjectURL(file) : avatar;

  async function onSubmit(data) {
    const formData = new FormData();
    formData.append("firstName", data.firstName);
    formData.append("lastName", data.lastName);
    formData.append("userName", data.userName);
    formData.append("bio", data.bio);
    formData.append("avatarId", avatarId || null);

    if (data.profilePicture && data.profilePicture.length > 0) {
      const fileBinary = data.profilePicture[0];
      formData.append("profilePicture", fileBinary);
    }

    await updateUserProfile(formData);
    toast.success("Profile updated!");
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col mt-6 gap-3 rounded-lg bg-card border border-border shadow-sm mb-6 px-6 py-4"
    >
      {/* profile picture */}
      <div className="flex-1 flex items-center lg:gap-12 sm:gap-7 gap-6 mb-6">
        <div className="flex flex-col">
          <label className="text-lg font-medium text-foreground mb-4">
            Profile Picture
          </label>
          <div
            className={`relative flex items-center justify-center overflow-hidden ${errors.profilePicture ? "border-red-500" : "border-border"} ${previewUrl && "ring-ring ring"} has-[:focus-visible]:ring-2 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2 bg-input h-36 w-36 border rounded-full focus:outline-none`}
          >
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
                <Camera className="text-muted-foreground" size={40} />
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-2 mt-8">
          <label
            htmlFor="profile-picture"
            className="flex mr-auto items-center bg-primary px-3 py-1.5 text-indigo-50 cursor-pointer rounded-lg"
          >
            <span className="text-current text-center">Change picture</span>
            <input
              id="profile-picture"
              type="file"
              className="sr-only"
              accept="image/*"
              {...register("profilePicture")}
            />
          </label>
          <p className="text-muted-foreground text-sm">
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
        error={errors.userName}
        label="Username"
        type="UserName"
        icon={userNameInputFieldIcon(
          isLoadingForValid,
          isValidUserName,
          newUserName,
          userName,
          errors.userName,
        )}
        {...register("userName")}
      />
      <div className="flex flex-col gap-1 w-full">
        <label
          htmlFor="bio"
          className="text-muted-foreground font-semibold tracking-wide text-sm"
        >
          Bio <span>{calcTextRange(bioChar, 160)}</span>
        </label>
        <textarea
          {...register("bio")}
          type="text"
          className={`${errors.bio ? "border-destructive focus:border-destructive" : "border-border focus:border-primary"} bg-input p-1 border rounded-lg w-full min-h-18 text-sm focus:outline-none`}
        />
        <span className="flex">
          {errors.bio && (
            <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
              {errors.bio.message}
            </p>
          )}
        </span>
      </div>
      <div className="ml-auto">
        <FormsButton
          disabled={
            isSubmitting || !isDirty || isLoadingForValid || isValidUserName
          }
          isSubmiting={isSubmitting}
          type="submit"
          style="authForm"
          ariaLabel="Save changes"
        >
          {" "}
          Save changes
        </FormsButton>
      </div>
    </form>
  );
}
function userNameInputFieldIcon(
  isLoading,
  isValid,
  newUserName,
  userName,
  error,
) {
  let icon = null;

  if (isLoading && !error) {
    return <MiniSpinner />;
  } else if (newUserName === "" || newUserName.length === 0) {
    return null;
  } else if (isValid && newUserName.length !== 0 && !error) {
    return <XCircle className="text-destructive" />;
  } else if (!isValid && userName !== newUserName && !error) {
    return <CheckCircle2Icon className="text-brand-success" />;
  }
}
export default UpdateProfileForm;
