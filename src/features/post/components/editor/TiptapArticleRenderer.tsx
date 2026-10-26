import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import { renderToReactElement } from "@tiptap/static-renderer/pm/react";
import type { JSONContent } from "@tiptap/core";
import { CodeBlockLowlight } from "@tiptap/extension-code-block-lowlight";
import lowlight from "./lowlight-config";
import ArticleCodeBlock from "./ArticleCodeBlock";

type TiptapRendererProps = {
  content: JSONContent;
};

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
    <article className="tiptap-article max-w-none">{renderedContent}</article>
  );
}

export default TiptapArticleRenderer;
