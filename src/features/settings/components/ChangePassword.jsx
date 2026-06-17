"use client";
import FormsButton from "@/components/ui/FormsButton";
import Input from "@/components/ui/Input";
import updatePassword from "@/lib/actions/settings/account/updatePassword";
import { changePasswordSchema } from "@/lib/utils/schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

function ChangePassword() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors, isDirty },
    reset,
    setError,
    clearErrors,
    watch,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
  });
  async function onSubmit(data) {
    const { error, message } = await updatePassword(data);
    if (error) {
      toast.error(message);
      setError("currentPassword", {
        type: "manual",
        message: "Incorrect password",
      });
    } else if (!error && message) {
      toast.success(message);
      reset();
    }
  }
  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-card border border-border p-4">
      <h3 className="col-span-2 text-foreground font-medium">
        Change Password
      </h3>
      <form className="flex flex-col gap-2" onSubmit={handleSubmit(onSubmit)}>
        <Input
          label="Current Password"
          icon="password"
          error={errors.currentPassword}
          {...register("currentPassword")}
        />
        <Input
          label="New Password"
          icon="password"
          error={errors.newPassword}
          {...register("newPassword")}
        />
        <Input
          label="Confirm New Password"
          icon="password"
          error={errors.confirmNewPassword}
          {...register("confirmNewPassword")}
        />
        <div className="self-end">
          <FormsButton
            disabled={isSubmitting || !isDirty}
            isSubmiting={isSubmitting}
            style="authForm"
          >
            Update Password
          </FormsButton>
        </div>
      </form>
    </div>
  );
}

export default ChangePassword;
