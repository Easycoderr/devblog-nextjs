import { Prisma } from "@prisma/client";

type Comment = Prisma.CommentGetPayload<{
  include: { user: true };
}>;
type CommentTree = Comment & {
  replies: CommentTree[];
};
function listToTree(list: Comment[]): CommentTree[] {
  const map: Record<string, CommentTree> = {};
  const tree: CommentTree[] = [];

  // Create the Map and initialize replies
  list.forEach((comment) => {
    map[comment.id] = { ...comment, replies: [] };
  });

  // Distribute comments to parents or root
  list.forEach((comment) => {
    if (comment.parentId) {
      // Find the parent in the map and push this comment into its replies
      map[comment.parentId].replies.push(map[comment.id]);
    } else {
      // No parent? It's a top-level comment
      tree.push(map[comment.id]);
    }
  });

  return tree;
}

export default listToTree;
