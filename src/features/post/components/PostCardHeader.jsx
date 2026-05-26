import Image from "next/image";
import PostActions from "./PostActions";
import categoryColorPicker from "@/lib/utils/categoryColorPicker";

async function PostCardHeader({ post, user }) {
  const { category } = post;
  const categoryColor = categoryColorPicker(category);
  return (
    <>
      <div className="relative h-[270px] md:h-[240px]  w-full">
        <Image
          className="object-cover"
          src={post.imageUrl}
          fill
          sizes="200px"
          alt={post.title}
          quality={100}
        />
        <div className="absolute bottom-2 left-2 flex text-xs capitalize tracking-wide font-sora font-medium  items-center">
          <span className={`${categoryColor} px-2 py-0.5 rounded-full`}>
            {post.category}
          </span>
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
