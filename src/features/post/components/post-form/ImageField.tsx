import {
  ImageDownIcon,
  ImageIcon,
  Maximize,
  Minimize,
  Upload,
  X,
} from "lucide-react";
import Image from "next/image";
import { useRef, useState } from "react";
import {
  FieldError,
  UseFormRegister,
  UseFormSetValue,
  UseFormWatch,
} from "react-hook-form";
interface FormValues {
  title: string;
  description: string;
  content: string;
  category: string;
  image: FileList | undefined;
}
type ImageFieldProps = {
  setValue: UseFormSetValue<FormValues>;
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
  error?: FieldError;
  title?: string;
  image?: string;
};
function ImageField({
  setValue,
  error,
  image,
  title,
  watch,
  register,
}: ImageFieldProps) {
  const [showImage, setShowImage] = useState(false);
  const [imageUrl, setImageUrl] = useState<string | undefined | null>(image);
  const [isDragging, setIsDragging] = useState(false);
  //  Create a native DOM reference pointer to manage explicit manual triggers
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const fileList = watch("image");
  const file = fileList && fileList[0];
  let previewUrl = file ? URL.createObjectURL(file) : imageUrl || null;

  // Extract ref tracking logic cleanly out from React Hook Form's assignment loop
  const { ref: registerRef, ...registerRest } = register("image");

  function handleRemoveImage(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();
    e.stopPropagation();
    const emptyFileList = new DataTransfer().files;

    setValue("image", emptyFileList, { shouldValidate: true });

    setImageUrl(null);
  }

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };
  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
    e.dataTransfer.dropEffect = "copy";
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };
  function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files && files[0] && files[0].type.startsWith("image/")) {
      setValue("image", files, { shouldValidate: true });
      setImageUrl(URL.createObjectURL(files[0]));
    }
  }
  const triggerFileBrowser = (e: React.MouseEvent) => {
    if (
      e.target !== e.currentTarget &&
      (e.target as HTMLElement).tagName === "BUTTON"
    )
      return;
    fileInputRef.current?.click();
  };
  return (
    <div>
      {showImage && previewUrl && (
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
      <div className="flex flex-col gap-1 w-full">
        <div
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={handleDragEnter}
          onDragLeave={handleDragLeave}
          onDragOverCapture={handleDragOver}
          onDrop={handleDrop}
          className={`${isDragging ? "cursor-grab" : "cursor-pointer"} group relative bg-input overflow-hidden border-2 ${error ? "border-destructive focus:border-destructive" : " border-border border-dashed focus:border-primary"} rounded-lg`}
        >
          <input
            className="hidden"
            type="file"
            accept="image/*"
            {...registerRest}
            ref={(instance) => {
              registerRef(instance);
              fileInputRef.current = instance;
            }}
          />
          <div
            className={`${previewUrl && "min-h-64"} z-20 p-2 py-8 flex flex-col gap-1 items-center`}
          >
            {!previewUrl && (
              <div className="flex flex-col items-center gap-1">
                {isDragging ? (
                  <ImageDownIcon className="text-muted-foreground" size={58} />
                ) : (
                  <ImageIcon className="text-muted-foreground" size={58} />
                )}
                <p className="text-lg font-semibold">Upload a cover image</p>
                <span className="text-sm text-muted-foreground">
                  Drag or drop and image here, or click to browse
                </span>
                <span className="text-sm text-muted-foreground">
                  JPG, PNG or WebbP (Max 4MB)
                </span>
                <button
                  type="button"
                  onClick={triggerFileBrowser}
                  className="flex cursor-pointer items-center gap-1 mt-2 px-3 py-2 bg-primary/15 border border-primary/35 rounded-lg hover:opacity-75 transition-all duration-300"
                >
                  <Upload size={18} />
                  Upload image
                </button>
              </div>
            )}
          </div>
          {/* preview */}
          {previewUrl && (
            <>
              <Image
                fill
                sizes="256px"
                className="object-cover"
                src={previewUrl}
                alt={title || "Post image"}
              />

              <button
                type="button"
                onClick={handleRemoveImage}
                className="hidden group-hover:block absolute top-2 right-2 rounded-full bg-red-300/50 text-red-700 cursor-pointer hover:opacity-75 p-1 transition-all duration-300"
              >
                <X className="text-sm" />
              </button>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  setShowImage(!showImage);
                }}
                className="hidden group-hover:block absolute bottom-2 right-2 rounded-full bg-gray-300/50 text-gray-700 cursor-pointer hover:opacity-75 p-1 transition-all duration-300"
              >
                <Maximize className="text-sm" />
              </button>
            </>
          )}
        </div>
        <span className="flex">
          {error && (
            <p className="text-destructive bg-destructive/10 px-2 py-1 rounded-md text-xs">
              {error.message}
            </p>
          )}
        </span>
      </div>
    </div>
  );
}

export default ImageField;
