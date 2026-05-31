"use client";
import { postFormSchema } from "../../../lib/utils/schema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import createPost, { updatePost } from "../../../lib/actions/post";
import FormsButton from "@/components/ui/FormsButton";
import NavigateBackButton from "../../../components/ui/NavigateBackButton";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useState } from "react";
import { CameraIcon, Maximize, Minimize, X } from "lucide-react";
import calcTextRange from "@/lib/utils/calcTextLength";
import Input from "@/components/ui/Input";
import ContentPopoverHelper from "./ContentPopoverHelper";

function Form({ postData }) {
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
    handleSubmit,
    reset,
    setValue,
    formState: { errors, isSubmitting, isDirty },
    watch,
  } = useForm({
    resolver: zodResolver(postFormSchema),
    defaultValues: {
      title: title || "",
      description: description || "",
      content: content || "",
      category: category || "",
    },
  });

  const [showImage, setShowImage] = useState();
  const [imageUrl, setImageUrl] = useState(image);
  // read the live value of the "image"
  const fileList = watch("image");
  //  Extract the first actual file object safely
  const file = fileList && fileList.length > 0 ? fileList[0] : null;
  // Preview URL
  let previewUrl = file ? URL.createObjectURL(file) : imageUrl || null;
  // read the live value of the description
  const des = watch("description");
  async function onSubmit(data) {
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
      formData.append("id", id || null);
      formData.append("imageId", imageId || null);
      const result = await updatePost(formData);
      toast.success(`${data.title} updated successfully!`);
      router.push(`/blogs/${result.slug}`);
    } else {
      await createPost(formData);
      toast.success(`${data.title} created successfully!`);
      router.back();
    }
  }
  function handleRemoveImage(e) {
    e.preventDefault();
    e.stopPropagation();

    setValue("image", null, { shouldValidate: true });
    setImageUrl(null);
  }
  return (
    <>
      {/* form body */}
      {showImage && (
        <div className="absolute z-40 top-0 bottom-0 right-0 left-0 bg-white/10 backdrop-blur-md flex items-center justify-center">
          <div className="relative z-50 group">
            <Image
              width={1000}
              height={1000}
              className="object-cover"
              src={previewUrl}
              alt={title || "Post image"}
            />
            <button
              type="button"
              onClick={() => setShowImage(!showImage)}
              className="hidden group-hover:block absolute bottom-2 right-2 rounded-full bg-gray-300/50 text-gray-700 cursor-pointer hover:opacity-75 p-1 transition-all duration-300"
            >
              <Minimize className="text-sm" />
            </button>
          </div>
        </div>
      )}
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
          <div className="flex flex-col gap-1 w-full">
            <label
              className={`group relative bg-input overflow-hidden border ${errors.image ? "border-destructive focus:border-destructive" : " border-border focus:border-ring"} rounded-lg`}
              htmlFor="image"
            >
              <div
                className={`${previewUrl && "min-h-64"} z-20 p-2 flex flex-col gap-1 items-center`}
              >
                <CameraIcon className="text-muted-foreground" size={50} />

                <span className="text-muted-foreground">
                  Click to select or upload image
                </span>
              </div>
              {/* preview */}
              {previewUrl && (
                <>
                  <div>
                    <Image
                      fill
                      sizes="256px"
                      className="object-cover"
                      src={previewUrl}
                      alt={title || "Post image"}
                    />
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveImage}
                    className="hidden group-hover:block absolute top-2 right-2 rounded-full bg-red-300/50 text-red-700 cursor-pointer hover:opacity-75 p-1 transition-all duration-300"
                  >
                    <X className="text-sm" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setShowImage(!showImage)}
                    className="hidden group-hover:block absolute bottom-2 right-2 rounded-full bg-gray-300/50 text-gray-700 cursor-pointer hover:opacity-75 p-1 transition-all duration-300"
                  >
                    <Maximize className="text-sm" />
                  </button>
                </>
              )}
              <input
                className="hidden"
                type="file"
                id="image"
                name="image"
                accept="image/*"
                {...register("image")}
              />
            </label>
            <span className="flex">
              {errors.image && (
                <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
                  {errors.image.message}
                </p>
              )}
            </span>
          </div>
          <Input
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
            </label>
            <textarea
              {...register("description")}
              type="text"
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
              <span>
                <ContentPopoverHelper />
              </span>
            </label>
            <textarea
              {...register("content")}
              type="text"
              className={`${errors.content ? "border-destructive focus:border-destructive" : "bg-input border-border focus:border-ring"} p-1 border min-h-48 rounded-lg w-full text-sm focus:outline-none`}
            />
            <span className="flex">
              {errors.content && (
                <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
                  {errors.content.message}
                </p>
              )}
            </span>
          </div>
          <div className="flex flex-col gap-1 w-full">
            <label
              htmlFor="category"
              className="text-muted-foreground font-semibold tracking-wide text-sm"
            >
              Category
            </label>
            <select
              className={`${errors.category ? "border-destructive focus:border-destructive" : "border-border bg-background focus:border-ring"} text-foreground p-2 border rounded-lg w-full text-sm focus:outline-none`}
              {...register("category")}
            >
              <option className="text-muted-foreground" value="">
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
                <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
                  {errors.category.message}
                </p>
              )}
            </span>
          </div>
          <div className="ml-auto flex gap-2">
            <button
              type="reset"
              onClick={() =>
                reset({
                  image: null,
                  title: title || "",
                  description: description || "",
                  content: content || "",
                  category: category || "",
                })
              }
              className="px-2 py-1 text-stone-900 tracking-wider border bg-white shadow rounded-lg hover:opacity-75 transition-all duration-200 active:scale-105"
            >
              Reset
            </button>
            <FormsButton
              disabled={isSubmitting || !isDirty}
              type="submit"
              style="form"
              ariaLabel={postData?.id ? "Update article" : "Create article"}
            >
              {postData?.id ? "Update" : "Create"}
            </FormsButton>
          </div>
        </form>
      </div>
    </>
  );
}

export default Form;
