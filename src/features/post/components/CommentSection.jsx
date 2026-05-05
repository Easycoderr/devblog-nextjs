import getCurrentUser from "@/lib/getUser";
import AddCommentForm from "./AddCommentForm";

async function CommentSection({ postId }) {
  const user = await getCurrentUser();

  return (
    <div className="col-span-2 mt-8 space-y-4">
      <h3 className="text-xl font-semibold text-slate-900 mb-6">
        Comments ({4})
      </h3>
      {/* Initial list of top-level comments */}
      <div className="space-y-6 w-full">
        <span className="text-gray-900 bg-gray-300 p-2 rounded-lg mx-auto">
          There is no comment yet be the first one add your comment
        </span>
      </div>
      <AddCommentForm postId={postId} userId={user.id} />
    </div>
  );
}

export default CommentSection;
