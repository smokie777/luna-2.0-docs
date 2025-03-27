import "./App.scss";
import { useRef, useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { DocumentationPage } from "./DocumentationPage";

const App = () => {
  const [article, setArticle] = useState("Overview");
  const documentationPageRef = useRef<HTMLDivElement>(null);

  const scrollToDocumentationPageTop = () => {
    if (documentationPageRef.current) {
      documentationPageRef.current.scroll({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  return (
    <div className="app">
      <TopNav />
      <div className="app_body">
        <Sidebar
          article={article}
          setArticle={(i: string) => setArticle(i)}
          scrollToDocumentationPageTop={scrollToDocumentationPageTop}
        />
        <DocumentationPage article={article} ref={documentationPageRef} />
      </div>
    </div>
  );
};

export default App;
