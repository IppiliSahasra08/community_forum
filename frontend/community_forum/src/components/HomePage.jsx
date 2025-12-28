import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { collection, getDocs, query, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import PostList from "./postlist";


// import "./App.css"; // optional if you want a separate css

const HomePage = () => {
  const navigate = useNavigate();
  const [recentPosts, setRecentPosts] = useState([]);
  useEffect(() => {
  const fetchPosts = async () => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const snapshot = await getDocs(q);
    setRecentPosts(
      snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }))
    );
  };

  fetchPosts();
}, []);


  return (
    <div className="page-container">
      <h2 className="page-title">Community Forum</h2>

      <button
  className="create-post-btn"
  onClick={() => navigate("/create-post")}
>
  + Create Post
</button>


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
        <PostList />

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

