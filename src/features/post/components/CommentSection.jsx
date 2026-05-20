import getCurrentUser from "@/lib/getUser";
import AddCommentForm from "./AddCommentForm";
import { getComments } from "@/lib/actions/post";
import listToTree from "@/lib/utils/listToTree";
import Link from "next/link";
import { ArrowRightToLine } from "lucide-react";
import PostCommentListSkeleton from "./skeletons/PostCommentSkeleton";
import CommentList from "./CommentList";
import { Suspense } from "react";

async function CommentSection({ post }) {
  const user = await getCurrentUser();
  const userId = user?.id;
  const comments = await getComments(post?.id);
  const listOfComments = listToTree(comments);

  return (
    <div className="col-span-2 mt-8 space-y-4">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Comments ({listOfComments.length})
      </h3>
      {/* Initial list of top-level comments */}
      <div
        className={`space-y-6 w-full max-h-96 ${listOfComments.length !== 0 && "overflow-y-scroll"} ${listOfComments.length !== 0 || "flex items-center gap-1"}`}
      >
        {listOfComments.length === 0 ? (
          !userId ? (
            <div className="flex items-center gap-1 text-gray-900 bg-gray-100 p-2 rounded-lg mx-auto">
              No comments yet.{" "}
              <span>
                <Link
                  href="/auth/signin"
                  className="hover:underline underline-offset-4 text-accent hover:text-hover flex items-center transition-all duration-200 gap-1"
                >
                  Sign in
                </Link>
              </span>
              to be the first to add one!
            </div>
          ) : (
            <div className="text-gray-900 my-8 bg-gray-100 p-2 rounded-lg mx-auto self-auto">
              There are no comments yet. Be the first to share your thoughts!
            </div>
          )
        ) : (
          <Suspense fallback={<PostCommentListSkeleton />}>
            <CommentList
              comments={listOfComments}
              post={post}
              userId={userId}
            />
          </Suspense>
        )}
      </div>
      {userId ? (
        <AddCommentForm postId={post?.id} userId={userId} />
      ) : (
        <p className="text-gray-900  rounded-lg flex items-center gap-2">
          Sign in to add a comment.{" "}
          <Link
            href="/auth/signin"
            className="group hover:underline underline-offset-4 text-accent hover:text-hover flex items-center transition-all duration-200 gap-1"
          >
            Sign in{" "}
            <ArrowRightToLine
              size={20}
              className="mt-1 group-hover:translate-x-1 transition-all duration-200"
            />
          </Link>
        </p>
      )}
    </div>
  );
}

export default CommentSection;
