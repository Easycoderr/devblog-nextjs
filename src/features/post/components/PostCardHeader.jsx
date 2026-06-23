import Image from "next/image";
import PostActions from "./PostActions";
import categoryColorPicker from "@/lib/utils/categoryColorPicker";
import { Eye } from "lucide-react";

async function PostCardHeader({ post, user }) {
  const { category, title, imageUrl, _count } = post;
  const categoryColor = categoryColorPicker(category);
  return (
    <>
      <div className="relative h-[270px] md:h-[240px]  w-full">
        <Image
          className="object-cover"
          src={imageUrl}
          fill
          sizes="200px"
          alt={title}
          quality={100}
        />
        <div className="absolute bottom-2 left-2 flex gap-4 text-xs capitalize tracking-wide font-sora font-medium  items-center">
          <span className={`${categoryColor} px-2 py-0.5 rounded-full`}>
            {category}
          </span>
          <div className="flex items-center gap-1 bg-muted-foreground/20 text-white rounded-full px-2 py-0.5">
            <Eye className="size-5" />
            <span className="!text-md">{_count?.viewLog}</span>
          </div>
        </div>
      </div>
      {/* post actions */}
      <div className="absolute top-0 right-0">
        <PostActions user={user} post={post} />
      </div>
    </>
  );
}

export default PostCardHeader;
