import "./Sidebar.scss";
import { content } from "./content";
import { classNames } from "./utils";

interface SidebarProps {
  article: string;
  setArticle: (i: string) => void;
  scrollToDocumentationPageTop: () => void;
}

export const Sidebar = ({
  article,
  setArticle,
  scrollToDocumentationPageTop,
}: SidebarProps) => {
  return (
    <div className="sidebar">
      {content.map((s, index) => (
        <div className="section" key={index}>
          {Object.values(s)[0].map((a, index) => (
            <div
              className={classNames([
                "article",
                index ? "" : "article--bold",
                article === a ? "article--selected" : "",
              ])}
              key={index}
              onClick={() => {
                setArticle(a);
                scrollToDocumentationPageTop();
              }}
            >
              <div>{a}</div>
              <div className="article_highlight" />
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};
