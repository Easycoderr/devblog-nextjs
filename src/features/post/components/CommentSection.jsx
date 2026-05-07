import getCurrentUser from "@/lib/getUser";
import AddCommentForm from "./AddCommentForm";
import { getComments } from "@/lib/actions/post";
import listToTree from "@/lib/utils/listToTree";
import { comment } from "postcss";
import Comment from "./Comment";

async function CommentSection({ postId }) {
  const user = await getCurrentUser();
  const comments = await getComments(postId);
  console.log(comments);
  const listOfComments = listToTree(comments);
  console.log(listOfComments);
  return (
    <div className="col-span-2 mt-8 space-y-4">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Comments ({listOfComments.length})
      </h3>
      {/* Initial list of top-level comments */}
      <div className="space-y-6 w-full overflow-y-scroll h-96">
        {listOfComments.length === 0 ? (
          <span className="text-gray-900 bg-gray-300 p-2 rounded-lg mx-auto">
            There is no comment yet be the first one add your comment
          </span>
        ) : (
          listOfComments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))
        )}
      </div>
      <AddCommentForm postId={postId} userId={user.id} />
    </div>
  );
}

export default CommentSection;
