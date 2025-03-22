import "./DocumentationPage.scss";
import { useEffect, useState } from "react";
import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";

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
        console.log(text);
        setMarkdownContent(text);
      })
      .catch((err) => console.error(err));
  }, [article]);

  return (
    <div className="documentation_page">
      <ReactMarkdown rehypePlugins={[rehypeRaw]}>
        {markdownContent}
      </ReactMarkdown>
    </div>
  );
};
