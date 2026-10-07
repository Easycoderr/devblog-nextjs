import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import type { JSONContent } from "@tiptap/core";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
import ArticleCodeBlock from "./ArticleCodeBlock";

type TiptapRendererProps = {
  content: JSONContent;
};
const lowlight = createLowlight(common);
function TiptapArticleRenderer({ content }: TiptapRendererProps) {
  const renderedContent = renderToReactElement({
    extensions: [
      StarterKit.configure({
        codeBlock: false,
      }),
      Image,
      CodeBlockLowlight.configure({
        lowlight,
      }),
    ],

    content,
    options: {
      nodeMapping: {
        codeBlock: ({ node, children }) => (
          <ArticleCodeBlock language={node.attrs.language as string | null}>
            {children}
          </ArticleCodeBlock>
        ),
      },
    },
  });
  return (
    <div className="tiptap prose prose-lg dark:prose-invert max-w-none">
      {renderedContent}
    </div>
  );
}

export default TiptapArticleRenderer;
