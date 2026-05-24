import Image from "next/image";
import PostActions from "./PostActions";
import UserAvatar from "@/components/ui/UserAvatar";
import { getUserById } from "@/lib/getUser";

async function PostCardHeader({ post, user }) {
  const author = await getUserById(post?.authorId);
  return (
    <>
      <div className="relative h-[260px] md:h-[250px]  w-full">
        <Image
          className="object-cover"
          src={post.imageUrl}
          fill
          sizes="200px"
          alt={post.title}
          quality={100}
        />
      </div>
      {/* post actions */}
      <div className="absolute top-0 right-0">
        <PostActions user={user} post={post} />
      </div>
      <div className="absolute -top-1 -left-full group-hover:-left-1 group-focus:-left-1 p-2 bg-white/50 backdrop-blur-sm rounded-br-md text-gray-800 transition-all duration-300">
        <UserAvatar user={author} />
      </div>
    </>
  );
}

export default PostCardHeader;
