"use client";
import { postFormSchema } from "../../../../lib/utils/schema";
import {
  Control,
  FieldPath,
  FieldValues,
  useForm,
  useWatch,
} from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import NavigateBackButton from "../../../../components/ui/NavigateBackButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

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
import { useCallback, useMemo } from "react";
import DescriptionField from "./descriptionField";
import EditorField from "./editorField";
import TitleField from "./TitleField";

function Form({ postData }: { postData?: PostData | null }) {
  const isUpdateMode = !!postData?.imageUrl;
  const schema = useMemo(() => postFormSchema(isUpdateMode), [isUpdateMode]);
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

  const { register, control, handleSubmit, reset, setValue } =
    useForm<FormData>({
      resolver: zodResolver(schema),
      defaultValues: {
        title: title || "",
        description: description || "",
        content: content || "",
        category: category || "",
      },
    });

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
            title={title}
            setValue={setValue}
            register={register}
            control={control}
          />
          <TitleField control={control} {...register("title")} />
          <DescriptionField control={control} {...register("description")} />
          <EditorField
            content={content}
            control={control}
            setValue={setValue}
          />
          <CategorySelector control={control} />

          <PostFormButtonActions
            postId={postData?.id}
            reset={reset}
            control={control}
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
