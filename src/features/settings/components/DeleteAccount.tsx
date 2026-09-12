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
import { useTransition } from "react";
import z from "zod";
import type { UserType } from "@/types/userType";
type FormData = z.infer<typeof deleteAccountPasswordSchema>;

function DeleteAccount({ user }: { user: UserType }) {
  const route = useRouter();
  const {
    register,
    reset,
    formState: { isSubmitting, isDirty, errors },
    setError,
    handleSubmit,
  } = useForm<FormData>({
    resolver: zodResolver(deleteAccountPasswordSchema),
  });
  if (!user) return null;
  const { provider } = user;
  async function onSubmit(data: FormData) {
    const response = await deleteAccount(data);
    if (response && response.error) {
      setError("password", { type: "manual", message: response.message });
    }
    route.replace("/");
  }
  // for google provider
  async function handleDeleteAccount() {
    const response = await deleteAccount({ password: "" });
    if (response?.error) return;
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
              variant="destructive"
              className="flex justify-center md:justify-normal gap-1 items-center text-brand-danger border border-brand-danger/40 whitespace-nowrap rounded-lg py-2! px-4! hover:opacity-75 cursor-pointer text-md"
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
            {provider !== "google" ? (
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
                    disabled={isSubmitting}
                  >
                    Yes, delete
                  </Button>
                </DialogFooter>
              </form>
            ) : (
              <OnSubmitButton onSubmit={handleDeleteAccount} />
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}
function OnSubmitButton({ onSubmit }: { onSubmit: () => Promise<void> }) {
  const [isPending, startTransition] = useTransition();
  return (
    <DialogFooter>
      <DialogClose asChild>
        <Button variant="outline">Cancel</Button>
      </DialogClose>
      <Button
        variant="destructive"
        onClick={() => {
          startTransition(() => {
            onSubmit();
          });
        }}
        disabled={isPending}
      >
        {isPending ? "Deleting..." : "Yes, delete"}
      </Button>
    </DialogFooter>
  );
}
export default DeleteAccount;
