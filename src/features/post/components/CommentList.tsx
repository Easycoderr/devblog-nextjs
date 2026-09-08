import { Prisma } from "@prisma/client";
import Comment from "./Comment";
import type { PostData } from "@/types/postTypes";

export type CommentData = Prisma.CommentGetPayload<{
  include: {
    user: true;
  };
}> & { replies: CommentData[] };

type CommentList = {
  comments: CommentData[];
  post: PostData;
  userId?: string;
};
function CommentList({ comments, post, userId }: CommentList) {
  return comments.map((comment) => (
    <Comment key={comment.id} post={post} userId={userId} comment={comment} />
  ));
}

export default CommentList;
