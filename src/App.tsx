import "./App.scss";
import { useState } from "react";
import { Sidebar } from "./Sidebar";
import { TopNav } from "./TopNav";
import { DocumentationPage } from "./DocumentationPage";

const App = () => {
  const [section, setSection] = useState("Adding a new feature");
  const [article, setArticle] = useState("Adding a new feature");

  return (
    <div className="app">
      <TopNav />
      <div className="app_body">
        <Sidebar
          section={section}
          setSection={(i: string) => setSection(i)}
          article={article}
          setArticle={(i: string) => setArticle(i)}
        />
        <DocumentationPage article={article} />
      </div>
    </div>
  );
};

export default App;
