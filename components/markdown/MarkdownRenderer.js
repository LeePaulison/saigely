import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

import { CodeBlock } from "./CodeBlock";

export const MarkdownRenderer = ({ content }) => {
  const testContent = "# Test\n\n```js\nconst x = 5;\nconsole.log(x);\n```";

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
