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
import ConfirmDeleteAction from "./ConfirmDeleteAction";
import { Trash2Icon } from "lucide-react";
function DeleteAlertDialog({ post }) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <DeleteButton
          variant="simple"
          className="group-data-[highlighted]/dropdown-menu-item:text-indigo-50!"
        >
          Delete
        </DeleteButton>
      </AlertDialogTrigger>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
            <Trash2Icon />
          </AlertDialogMedia>
          <AlertDialogTitle>Delete {post.title}?</AlertDialogTitle>
          <AlertDialogDescription>
            Are you sure? This will permanently delete this post. This action
            cannot be undone
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline">Cancel</AlertDialogCancel>
          <ConfirmDeleteAction post={post} />
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteAlertDialog;
