import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogMedia,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import DeleteButton from "@/features/post/components/DeleteButton";
import type { ReactNode } from "react";
type ConfirmationAlertDialogProps = {
  alertTitle: string;
  icon?: ReactNode;
  button: ReactNode;
  children: ReactNode;
  message: string;
};
function ConfirmationAlertDialog({
  alertTitle,
  icon,
  button,
  children,
  message,
}: ConfirmationAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton variant="simple">{button}</DeleteButton>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            {icon}
          </AlertDialogMedia>
          <AlertDialogTitle>{alertTitle}</AlertDialogTitle>
          <AlertDialogDescription>{message}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          {children}
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default ConfirmationAlertDialog;
