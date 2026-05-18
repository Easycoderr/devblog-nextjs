import { getPostBySlug, getPosts } from "../actions/post";

export default async function generateSlug(title) {
  let count = 1;
  let newSlug = title
    .trim()
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");

  while (await getPostBySlug(newSlug)) {
    newSlug = `${newSlug}-${count}`;
    count++;
  }

  return newSlug;
}
