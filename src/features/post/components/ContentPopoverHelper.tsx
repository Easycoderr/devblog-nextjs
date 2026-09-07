import { CircleQuestionMark } from "lucide-react";
import PopoverDialog from "./PopoverDialog";
function ContentPopoverHelper() {
  return (
    <PopoverDialog
      button={<CircleQuestionMark className="text-primary hover:opacity-75" />}
      variant="simple"
      className="border-none p-0 m-0"
    >
      <h2 className="text-lg font-bold text-foreground mb-1">
        Markdown Writing Guide
      </h2>

      <p className="text-sm text-muted-foreground mb-2">
        You can style your article content using Markdown syntax.
      </p>

      <div className="space-y-2 text-sm">
        <div>
          <p className="font-semibold text-foreground">Headings</p>

          <div className="bg-background rounded-lg p-2 mt-1">
            <p># Main Heading</p>
            <p>## Sub Heading</p>
            <p>### Small Heading</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-foreground">Bold Text</p>

          <div className="bg-background rounded-lg p-2 mt-1">
            <p>**This text becomes bold**</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-foreground">Lists</p>

          <div className="bg-background rounded-lg p-2 mt-1">
            <p>- First item</p>
            <p>- Second item</p>
            <p>- Third item</p>
          </div>
        </div>

        <div>
          <p className="font-semibold text-foreground">Code Block</p>

          <div className="bg-background rounded-lg p-2 mt-1 overflow-x-auto">
            <pre>{`\
       \`\`\`js
       const hello = "world";
       \`\`\`
       `}</pre>
          </div>
        </div>

        <div>
          <p className="font-semibold text-foreground">Tips</p>

          <ul className="list-disc ml-5 text-muted-background space-y-1 mt-1">
            <li>Use headings to organize your article.</li>
            <li>Keep paragraphs short and readable.</li>
            <li>Add code examples for technical topics.</li>
            <li>Use lists for steps and explanations.</li>
          </ul>
        </div>
      </div>
    </PopoverDialog>
  );
}

export default ContentPopoverHelper;
