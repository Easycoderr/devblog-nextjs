"use client";
import { ArrowLeftCircleIcon } from "lucide-react";
import { postFormSchema } from "../../../lib/utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createPost, { updatePost } from "../../../lib/actions/post";
import Button from "@/components/ui/Button";
import NavigateBackButton from "../../../components/ui/NavigateBackButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

function Form({ postData }) {
  // use useRoute to navigate
  const router = useRouter();
  const { id, title, description, content, category } = postData || {};
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isDirty },
  } = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
      content: content || "",
      category: category || "",
    },
  });
  async function onSubmit(data) {
    if (postData?.id) {
      await updatePost({ id, ...data });
      toast.success(`${title} updated successfully!`);
      router.back();
    } else {
      await createPost(data);
      toast.success(`${title} created successfully!`);
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
      <div className="border-1 border-black rounded-xl p-4 shadow-sm w-full md:max-w-3xl">
        <h2 className="text-3xl md:text-4xl tracking-tight font-bold text-accent mb-8 font-sora">
          {postData?.id ? "Update" : "Create"} your Article
        </h2>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-4 w-full"
        >
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="title"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Title
            </label>
            <input
              type="text"
              className={`${errors.title ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
              {...register("title")}
            />
            <span className="flex">
              {errors.title && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.title.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="description"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Description
            </label>
            <textarea
              {...register("description")}
              type="text"
              className={`${errors.description ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-1 border-2 rounded-lg w-full text-sm focus:outline-none`}
            />
            <span className="flex">
              {errors.description && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.description.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="content"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Content
            </label>
            <textarea
              {...register("content")}
              type="text"
              className={`${errors.content ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-1 border-2 rounded-lg w-full text-sm focus:outline-none`}
            />
            <span className="flex">
              {errors.content && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.content.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="category"
              className="text-gray-600 font-semibold tracking-wide text-sm"
            >
              Category
            </label>
            <select
              className={`${errors.category ? "border-red-500 focus:border-red-500" : " border-black/80 focus:border-accent"} p-2 border-2 rounded-lg w-full text-sm focus:outline-none`}
              {...register("category")}
            >
              <option className="text-gray-500" value="">
                Choose Category
              </option>
              <option value="react">React</option>
              <option value="javascript">Java Script</option>
              <option value="css">Css</option>
              <option value="html">HTML</option>
              <option value="cpp">C++</option>
            </select>
            <span className="flex">
              {errors.category && (
                <p className="text-red-500 bg-red-100 px-2 py-1 rounded-md text-xs">
                  {errors.category.message}
                </p>
              )}
            </span>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              type="reset"
              onClick={reset}
              className="px-2 py-1 tracking-wider border bg-white shadow rounded-lg hover:opacity-70 transition-all duration-200 active:scale-103"
            >
              Reset
            </button>
            <Button
              disabled={isSubmitting || !isDirty}
              type="submit"
              style="form"
              ariaLabel={postData?.id ? "Update article" : "Create article"}
            >
              {postData?.id ? "Update" : "Create"}
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
