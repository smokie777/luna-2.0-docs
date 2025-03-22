import "./TopNav.scss";

export const TopNav = () => {
  return (
    <div className="topnav">
      <div className="topnav_left">
        <div>
          <a
            href="https://github.com/smokie777/luna-2.0"
            target="_blank"
            rel="noopener"
          >
            luna-2.0
          </a>{" "}
          docs
        </div>
      </div>
      <div className="topnav_right">
        <a
          href="https://github.com/smokie777/luna-2.0-docs"
          target="_blank"
          rel="noopener"
        >
          <div className="github_logo">
            <img src="github-mark-white.png" width="32px" height="32px" />
            <div className="github_logo_halo" />
          </div>
        </a>
      </div>
    </div>
  );
};
