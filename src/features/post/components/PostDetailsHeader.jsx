import { ThumbsUp } from "lucide-react";
import NavigateBackButton from "../../../components/ui/NavigateBackButton";
import PostActions from "./PostActions";

import ShareButton from "./ShareButton";
import { getLikesByPostId, getSharesByPostId } from "@/lib/actions/post";
import LikeButton from "./LikeButton";
import { use } from "react";

async function PostDetailsHeader({ user, post }) {
  const [{ _count: postLikes, userLike }, { _count: postShares }] =
    await Promise.all([
      await getLikesByPostId(post.id, user?.id),
      await getSharesByPostId(post.id),
    ]);
  return (
    <div className="flex justify-between items-center">
      <NavigateBackButton>Back to blogs</NavigateBackButton>
      <div className="flex items-center gap-8">
        {/* like and share */}
        <div className="flex gap-4">
          <LikeButton
            totalLikes={postLikes.likes}
            userLike={userLike}
            user={user}
            post={post}
          />
          <ShareButton
            totalShares={postShares.shares}
            userId={user?.id}
            postId={post.id}
            slug={post.slug}
            title={post.title}
            text={post.description}
          />
        </div>
        <div className="flex gap-2">
          <PostActions post={post} user={user} />
          {/* edit */}
          {/* <Link
              href={`/blogs/edit/${post.id}`}
              className="flex gap-2 items-center bg-indigo-100 px-4 py-2 rounded-lg hover:opacity-80 hover:shadow-sm active:scale-103 hover:shadow-indigo-200 transition-all duration-200 "
            >
              <Pencil size={18} className="text-accent" />
              <span className="text-accent font-semibold tracking-wide">
                Edit
              </span>
            </Link>
          
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <DeleteButton variant="secondary">
                  <Trash2Icon size={18} className="text-red-500" />
                  <span className="text-red-500 font-semibold tracking-wide">
                    Delete
                  </span>
                </DeleteButton>
              </AlertDialogTrigger>
              <AlertDialogContent size="sm">
                <AlertDialogHeader>
                  <AlertDialogMedia className="bg-destructive/10 text-destructive dark:bg-destructive/20 dark:text-destructive">
                    <Trash2Icon />
                  </AlertDialogMedia>
                  <AlertDialogTitle>Delete {post.title}?</AlertDialogTitle>
                  <AlertDialogDescription>
                    Are you sure? This will permanently delete this post. This
                    action cannot be undone
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel variant="outline">
                    Cancel
                  </AlertDialogCancel>
                  <ConfirmDeleteAction post={post} />
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog> */}
        </div>
      </div>
    </div>
  );
}

export default PostDetailsHeader;
