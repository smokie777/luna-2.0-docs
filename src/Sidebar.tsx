import "./Sidebar.scss";
import { content } from "./content";
import { classNames } from "./utils";

interface SidebarProps {
  section: string;
  setSection: (i: string) => void;
  article: string;
  setArticle: (i: string) => void;
}

export const Sidebar = ({
  section,
  setSection,
  article,
  setArticle,
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
                window.scroll(0, 0);
                setArticle(a);
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
