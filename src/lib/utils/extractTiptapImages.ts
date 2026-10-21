type TiptapNode = {
  type?: string;
  attrs?: Record<string, unknown>;
  content?: TiptapNode[];
};

export type TiptapImageReference = {
  fileId: string;
  src: string | null;
};

export default function extractTiptapImages(
  content: string,
): Map<string, TiptapImageReference> | null {
  try {
    const document = JSON.parse(content) as TiptapNode;
    const images = new Map<string, TiptapImageReference>();

    function visit(node: TiptapNode) {
      if (node.type === "image") {
        const fileId = node.attrs?.fileId;
        const src = node.attrs?.src;

        if (typeof fileId === "string" && fileId.trim()) {
          images.set(fileId, {
            fileId,
            src: typeof src === "string" ? src : null,
          });
        }
      }

      if (Array.isArray(node.content)) {
        node.content.forEach(visit);
      }
    }

    visit(document);

    return images;
  } catch {
    // If content cannot be parsed, don't attempt image cleanup.
    return null;
  }
}
