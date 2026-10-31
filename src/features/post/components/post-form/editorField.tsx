import { memo, useCallback, useMemo } from "react";
import ArticleEditor from "../editor/ArticleEditor";
import type { JSONContent } from "@tiptap/react";
import {
  Control,
  useFormState,
  UseFormTrigger,
  type UseFormSetValue,
} from "react-hook-form";
import type { FormValues } from "./ImageField";
type EditorFieldProps = {
  setValue: UseFormSetValue<FormValues>;
  content?: string;
  control: Control<FormValues>;
  trigger: UseFormTrigger<FormValues>;
};
function EditorField({
  setValue,
  content,
  control,
  trigger,
}: EditorFieldProps) {
  const { errors } = useFormState({ control, name: "content", exact: true });
  // Parse saved content only when it changes.
  const initialContent = useMemo<JSONContent | undefined>(() => {
    return content ? JSON.parse(content) : undefined;
  }, [content]);

  const handleEditorChange = useCallback(
    (editorContent: JSONContent) => {
      setValue("content", JSON.stringify(editorContent), {
        shouldDirty: true,
      });
    },
    [setValue],
  );
  const handleEditorBlur = useCallback(() => {
    void trigger("content");
  }, [trigger]);
  return (
    <div className="flex flex-col gap-1 w-full">
      <label
        htmlFor="content"
        className="text-muted-foreground flex items-center gap-1 font-semibold tracking-wide text-sm"
      >
        Content
        <span className="text-destructive">*</span>
      </label>
      <ArticleEditor
        onBlur={handleEditorBlur}
        content={initialContent}
        onChange={handleEditorChange}
      />

      {errors.content?.message && (
        <span className="flex">
          <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
            {errors.content.message}
          </p>
        </span>
      )}
    </div>
  );
}

export default memo(EditorField);
