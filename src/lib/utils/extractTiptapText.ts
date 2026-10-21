import type { JSONContent } from "@tiptap/core";

function extractTiptapText(content: JSONContent): string {
  const textParts: string[] = [];

  function walk(node: JSONContent) {
    if (typeof node.text === "string") {
      textParts.push(node.text);
    }

    if (node.content) {
      for (const child of node.content) {
        walk(child);
      }
    }
  }

  walk(content);

  return textParts.join(" ");
}

export default extractTiptapText;
