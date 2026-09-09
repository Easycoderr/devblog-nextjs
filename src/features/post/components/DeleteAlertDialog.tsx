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
import DeleteButton from "./DeleteButton";
import { Trash2Icon } from "lucide-react";
import type { ReactNode } from "react";
type DeleteAlertDialogProps = {
  title: string;
  children: ReactNode;
  message: string;
};
function DeleteAlertDialog({
  title,
  children,
  message,
}: DeleteAlertDialogProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton
          variant="simple"
          className="group-data-highlighted/dropdown-menu-item:text-indigo-50!"
        >
          Delete
        </DeleteButton>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>
            Delete <span className="font-semibold">{title}?</span>
          </AlertDialogTitle>
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

export default DeleteAlertDialog;
