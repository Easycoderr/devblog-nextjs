import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { renderToHTMLString } from "@tiptap/static-renderer/pm/html-string";
import type { JSONContent } from "@tiptap/core";

type TiptapRendererProps = {
  content: JSONContent;
};

function TiptapRenderer({ content }: TiptapRendererProps) {
  const html = renderToHTMLString({
    extensions: [StarterKit, Image],
    content,
  });

  return (
    <div
      className="tiptap prose prose-lg dark:prose-invert max-w-none"
      dangerouslySetInnerHTML={{ __html: html }}
    />
  );
}

export default TiptapRenderer;
