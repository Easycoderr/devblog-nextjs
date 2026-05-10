function listToTree(list) {
  const map = {};
  const tree = [];

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
