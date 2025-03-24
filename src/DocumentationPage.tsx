import "./DocumentationPage.scss";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface DocumentationPageProps {
  article: string;
}

export const DocumentationPage = ({ article }: DocumentationPageProps) => {
  const [markdownContent, setMarkdownContent] = useState("");

  useEffect(() => {
    import(`./docs/${article}.md`)
      .then((res) => fetch(res.default))
      .then((res) => res.text())
      .then((text) => {
        setMarkdownContent(text);
      })
      .catch((err) => console.error(err));
  }, [article]);

  return (
    <div className="documentation_page">
      <ReactMarkdown
        // rehype allows ReactMarkdown to embed html from .md files
        rehypePlugins={[rehypeRaw]}
        // remark adds support for autolink literals, footnotes, strikethrough, tables, tasklists
        remarkPlugins={[remarkGfm]}
        components={{
          // make all markdown links open securely in a new tab
          a: ({ href, children, ...props }) => (
            <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
              {children}
            </a>
          ),
        }}
      >
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};
