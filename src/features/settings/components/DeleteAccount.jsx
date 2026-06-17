"use client";
import { Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import Input from "@/components/ui/Input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { deleteAccountPasswordSchema } from "@/lib/utils/schema";
import deleteAccount from "@/lib/actions/settings/account/deleteAccount";
import { useRouter } from "next/navigation";

function DeleteAccount() {
  const route = useRouter();
  const {
    register,
    reset,
    formState: { isSubmitting, isDirty, errors },
    setError,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(deleteAccountPasswordSchema),
  });
  async function onSubmit(data) {
    const result = await deleteAccount(data);
    if (result?.error) {
      setError("password", { type: "manual", message: result?.message });
    }
    route.replace("/");
  }
  return (
    <div className="flex flex-col gap-2.5 rounded-lg bg-brand-danger/10 border border-brand-danger/30 p-4">
      <h3 className="col-span-2 text-brand-danger font-medium">Danger Zone</h3>
      <div className="flex md:flex-row md:justify-between flex-col gap-2 md:gap-8 md:items-center">
        <p className="text-muted-foreground max-w-xl">
          Deleting your account will permanently remove,Profile, Articles,
          Comments, Likes This action cannot be undone.
        </p>
        <Dialog>
          <DialogTrigger asChild>
            <Button
              size="8"
              variant="destructive"
              className="flex justify-center md:justify-normal gap-1 items-center text-brand-danger border border-brand-danger/40 whitespace-nowrap rounded-lg !py-2 !px-4 hover:opacity-75 cursor-pointer text-md"
            >
              <Trash2 className="size-4 mb-0.5" />
              Delete account
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Deletion</DialogTitle>
              <DialogDescription>
                Are you sure? This action cannot be undone.
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="py-1">
                <Input
                  label="Please enter your
                password"
                  icon="password"
                  error={errors.password}
                  {...register("password")}
                />
              </div>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline" onClick={() => reset()}>
                    Cancel
                  </Button>
                </DialogClose>
                <Button
                  type="submit"
                  variant="destructive"
                  disabled={!isDirty || isSubmitting}
                >
                  Yes, delete
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}

export default DeleteAccount;
