import type { JSONContent } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";

const lowlight = createLowlight(common);

type TiptapArticleRendererProps = {
  content: JSONContent;
};

function TiptapArticleRenderer({ content }: TiptapArticleRendererProps) {
  const renderedContent = renderToReactElement({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      CodeBlockLowlight.configure({
        lowlight,
      }),
      Image,
    ],
    content,
  });

  return (
    <article className="tiptap prose prose-lg dark:prose-invert max-w-none">
      {renderedContent}
    </article>
  );
}

export default TiptapArticleRenderer;
