import Comment from "./Comment";

function CommentList({ comments, post, userId }) {
  return comments.map((comment) => (
    <Comment key={comment.id} post={post} userId={userId} comment={comment} />
  ));
}

export default CommentList;
