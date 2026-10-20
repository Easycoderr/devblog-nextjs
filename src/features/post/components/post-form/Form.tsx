"use client";
import { postFormSchema } from "../../../../lib/utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FormsButton from "@/components/ui/FormsButton";
import NavigateBackButton from "../../../../components/ui/NavigateBackButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Edit, Edit2Icon, PencilIcon, RefreshCcw } from "lucide-react";
import calcTextRange from "@/lib/utils/calcTextLength";
import Input from "@/components/ui/Input";

import { createPost } from "@/lib/actions/post/createPost";
import { updatePost } from "@/lib/actions/post/updatePost";
import { z } from "zod";
import type { PostData } from "@/types/postTypes";
import ArticleEditor from "../editor/ArticleEditor";
import type { JSONContent } from "@tiptap/core";
import ImageField from "./ImageField";
import CategorySelector from "./CategorySelector";
import PostFormButtonActions from "./PostFormButtonActions";

function Form({ postData }: { postData?: PostData | null }) {
  const isUpdateMode = !!postData?.imageUrl;
  const schema = postFormSchema(isUpdateMode);
  type FormData = z.infer<typeof schema>;
  // use useRoute to navigate
  const router = useRouter();
  const {
    id,
    title,
    description,
    content,
    category,
    imageUrl: image,
    imageId,
  } = postData || {};

  const {
    register,
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(postFormSchema(isUpdateMode)),
    defaultValues: {
      title: title || "",
      description: description || "",
      content: content || "",
      category: category || "",
    },
  });
  const initialContent = content ? JSON.parse(content) : "";

  // read the live value of the description
  const des = watch("description");

  async function onSubmit(data: FormData) {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    formData.append("category", data.category);

    if (data.image && data.image.length > 0) {
      const fileBinary = data.image[0];
      formData.append("image", fileBinary);
    }

    if (postData?.id) {
      if (id) formData.append("id", id);
      if (data.image && data.image.length > 0) {
        formData.append("image", data.image[0]);
      }
      if (imageId) {
        formData.append("imageId", imageId);
      }
      const response = await updatePost(formData);
      if (response) {
        toast.success(`${data.title} updated successfully!`);
        // router.push(`/blogs/${response.slug}`);
      }
    } else {
      await createPost(formData);
      toast.success(`${data.title} created successfully!`);
      router.back();
    }
  }

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
    <>
      {/* form body */}

      <div className="flex-1 self-start">
        <div className="self-start">
          <NavigateBackButton>Back to blogs</NavigateBackButton>
        </div>
      </div>
      <div className="border border-border rounded-xl p-4 shadow-sm w-full md:max-w-3xl">
        <div className="space-y-2 mb-8">
          <h2 className="text-3xl tracking-tight font-bold text-primary font-sora">
            {postData?.id ? "Update" : "Create"} your Article
          </h2>
          <p className="text-muted-foreground">
            Share your insights, tutorials, and tech discoveries with the
            developer community.
          </p>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <ImageField
            image={image}
            error={errors.image}
            title={title}
            setValue={setValue}
            register={register}
            watch={watch}
          />
          <Input
            required={true}
            label="Title"
            error={errors.title}
            type="text"
            {...register("title")}
          />
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="description"
              className="text-muted-foreground font-semibold tracking-wide text-sm"
            >
              Description <span>{calcTextRange(des, 300)}</span>
              <span className="text-destructive">*</span>
            </label>
            <textarea
              {...register("description")}
              className={`${errors.description ? "border-destructive focus:border-destructive" : "border-border focus:border-ring"} bg-input p-1 border rounded-lg w-full text-sm focus:outline-none`}
            />
            <span className="flex">
              {errors.description && (
                <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
                  {errors.description.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="content"
              className="text-muted-foreground flex items-center gap-1 font-semibold tracking-wide text-sm"
            >
              Content
              <span className="text-destructive">*</span>
            </label>
            <ArticleEditor
              content={initialContent}
              onChange={(content: JSONContent) => {
                setValue("content", JSON.stringify(content), {
                  shouldDirty: true,
                  shouldValidate: true,
                });
              }}
            />

            {errors.content?.message && (
              <span className="flex">
                <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
                  {errors.content.message}
                </p>
              </span>
            )}
          </div>
          <CategorySelector control={control} error={errors.category} />

          <PostFormButtonActions
            postId={postData?.id}
            reset={reset}
            isSubmiting={isSubmitting}
            isDirty={isDirty}
            title={title}
            content={content}
            description={description}
          />
        </form>
      </div>
    </>
  );
}

export default Form;
