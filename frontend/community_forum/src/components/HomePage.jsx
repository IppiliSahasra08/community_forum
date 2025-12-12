import React from "react";
import { useNavigate } from "react-router-dom";

// import "./App.css"; // optional if you want a separate css

const HomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page-container">
      <h2 className="page-title">Community Forum</h2>

      {/* Search */}
      <input
        type="text"
        placeholder="Search"
        className="search-input"
      />

      <div className="hero-section">
      <div className="hero-content">
        <h1 className="hero-title">Discussions</h1>
        <p className="hero-subtitle">Join the community</p>

          <input
          type="text"
          placeholder="🔍 Search"
          className="hero-search"
        />
        </div>
      </div>


      {/* Section Cards */}
      <div className="section-row">
        <div
          className="section-card"
          onClick={() => navigate("/announcements")}
        >
          <h3>News & Announcements</h3>
        </div>

        <div
          className="section-card"
          onClick={() => navigate("/ask-community")}
        >
          <h3>Ask the Community</h3>
        </div>
      </div>

      {/* Main Layout */}
      <div className="main-row">
        {/* LEFT — TOPIC LIST */}
        <div className="topics-left">
          <h4 className="section-label">Recently Active</h4>

          <div className="topic-card">
            <h4>How do I ensure the supplier can only edit their data?</h4>
            <p>
              Governance: Ensuring restricted access to the supplier portal.
            </p>
            <span className="meta">3 replies · 4 hours ago</span>
          </div>

          <div className="topic-card">
            <h4>Introducing Improved Portal Editing Features</h4>
            <p>
              New editing update that enhances admin capabilities.
            </p>
            <span className="meta">20 hours ago · Announcements</span>
          </div>
        </div>

        {/* RIGHT — SIDEBAR */}
        <div className="sidebar">
          <h4>Popular Tags</h4>

          <div className="tags">
            {[
              "automation",
              "best practice",
              "integrations",
              "GraphQL API",
              "product feedback",
            ].map((t) => (
              <span key={t} className="tag">
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

