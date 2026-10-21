import FormsButton from "@/components/ui/FormsButton";
import { PencilIcon, RefreshCcw } from "lucide-react";
import { UseFormReset } from "react-hook-form";
import { FormValues } from "./ImageField";
type PostFormButtonActionsProps = {
  postId?: string;
  reset: UseFormReset<FormValues>;
  isSubmiting?: boolean;
  isDirty?: boolean;
  title?: string;
  content?: string;
  description?: string;
  category?: string;
};

function PostFormButtonActions({
  postId,
  reset,
  isSubmiting,
  isDirty,
  title,
  content,
  description,
  category,
}: PostFormButtonActionsProps) {
  function handleResetForm() {
    reset({
      image: undefined,
      title: title || "",
      description: description || "",
      content: content || "",
      category: category || "",
    });
  }
  return (
    <div className="ml-auto flex gap-2">
      <button
        type="reset"
        onClick={handleResetForm}
        className="group flex items-center gap-1 cursor-pointer px-3 py-1.5 text-foreground tracking-wider border bg-card shadow rounded-lg hover:opacity-75 transition-all duration-200"
      >
        <RefreshCcw
          className="group-active:-rotate-180 transition-all duration-300"
          size={18}
        />
        <span>Reset</span>
      </button>

      <FormsButton
        icon={<PencilIcon size={18} />}
        disabled={isSubmiting || !isDirty}
        type="submit"
        buttonStyle="form"
        ariaLabel={postId ? "Update article" : "Create article"}
      >
        {postId ? "Update Article" : "Create Article"}
      </FormsButton>
    </div>
  );
}

export default PostFormButtonActions;
