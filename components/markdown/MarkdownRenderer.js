import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "./CodeBlock";

export const MarkdownRenderer = ({ content }) => {
  return (
    <Markdown
      components={{
        code(props) {
          return <CodeBlock {...props} />;
        },
      }}
    >
      {content}
    </Markdown>
  );
};
