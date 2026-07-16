"use client";
import FormsButton from "@/components/ui/FormsButton";
import Input from "@/components/ui/Input";
import { signInSchema } from "@/lib/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Mail } from "lucide-react";
import { useForm } from "react-hook-form";
function ChangeEmailForm({ setShowForm }) {
  const {
    register,
    reset,
    handleSubmit,
    formState: { isSubmitting, isDirty, errors },
  } = useForm({ resolver: zodResolver(signInSchema) });
  function onSubmit() {}
  function onReset() {
    console.log("hi");
    reset();
    setShowForm(false);
  }
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
