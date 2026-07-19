"use client";
import FormsButton from "@/components/ui/FormsButton";
import Input from "@/components/ui/Input";
import CheckEmail from "@/features/auth/components/CheckEmail";
import changeEmail from "@/lib/actions/settings/account/changeEmail";
import { changeEmailSchema } from "@/lib/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function ChangeEmailForm({ setShowForm, email }) {
  const [checkEmail, setCheckEmail] = useState(false);
  const {
    register,
    reset,
    handleSubmit,

    setError,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ resolver: zodResolver(changeEmailSchema(email)) });
  async function onSubmit(formData) {
    const { email: newEmail, password } = formData;
    const response = await changeEmail({ email, newEmail, password });
    if (!response) toast.error("Something went wrong, please try again.");
    if (response.error === "DUPLICATE-EMAIL") {
      setError("email", { message: response.message });
    } else if (response.error === "INVALID-PASS") {
      setError("password", { message: response.message });
    }
    if (response.success) {
      setCheckEmail(newEmail);
      toast.success(response.message);
    }
  }
  function onReset() {
    console.log("hi");
    reset();
    setShowForm(false);
  }
  if (checkEmail)
    return (
      <CheckEmail
        email={email}
        newEmail={checkEmail}
        setCheckEmail={setCheckEmail}
        mode="change"
      />
    );
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-2.5">
      <h3 className="col-span-2 text-foreground font-medium">
        Change email address
      </h3>
      <div className="flex flex-col gap-2 md:items-center">
        <div className="flex gap-2 flex-col md:flex-row w-full">
          <Input
            label="Email"
            {...register("email")}
            type="text"
            error={errors.email}
            icon={<Mail size={19} className="text-muted-foreground" />}
          />
          <Input
            label="Current Password"
            {...register("password")}
            error={errors.password}
            icon="password"
          />
        </div>
        <div className="flex gap-2 flex-auto w-full">
          <FormsButton
            type="button"
            style="settingsSecondary"
            onClick={() => onReset()}
          >
            Cancel
          </FormsButton>
          <FormsButton
            disabled={isSubmitting}
            isSubmiting={isSubmitting || !isDirty}
            type="submit"
            style="settingsPrimary"
          >
            Send Verification Email
          </FormsButton>
        </div>
      </div>
    </form>
  );
}

export default ChangeEmailForm;
