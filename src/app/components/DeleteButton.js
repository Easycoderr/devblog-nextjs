"use client";
import { TrashIcon } from "lucide-react";
import { deletePost } from "../lib/actions/post";
import { toast } from "sonner";
import { useTransition } from "react";
import { useParams, usePathname, useRouter } from "next/navigation";
const styles = {
  primary:
    "bg-red-100 p-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-red-200 transition-all duration-200 cursor-pointer",
  secondary:
    "flex gap-2 items-center bg-red-100 px-4 py-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-red-200 transition-all duration-200 cursor-pointer",
};
function DeleteButton({ post, children, style }) {
  const pathname = usePathname();
  console.log(pathname);
  // to navigate page
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  async function handleDeletePost() {
    startTransition(async () => {
      const result = await deletePost(post?.id);
      if (result?.success) {
        toast.success(`${post?.title} deleted successfully!`);
        router.push(`${pathname === "/" ? "/" : "blogs"}`);
      } else {
        toast.error(`There was an error happend while deleting ${post.title}`);
      }
    });
  }
  return (
    <button
      disabled={isPending}
      aria-label="delete post"
      onClick={handleDeletePost}
      className={`${isPending && "opacity-80 hover:shadow-none"} ${styles[style]}`}
    >
      <TrashIcon size={18} className="text-red-500" />
      {children}
    </button>
  );
}

export default DeleteButton;
