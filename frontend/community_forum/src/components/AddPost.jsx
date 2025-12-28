import { useState } from "react";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title.trim() || !content.trim()) {
      alert("All fields required");
      return;
    }

    try {
      setLoading(true);
      await addDoc(collection(db, "posts"), {
        title: title.trim(),
        content: content.trim(),
        replies: 0,
        createdAt: serverTimestamp(),
      });
      navigate("/");
    } catch (err) {
      alert("Error creating post");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page-container">
      <h2>Create Post</h2>

      <form onSubmit={handleSubmit} className="post-form">
        <input
          type="text"
          placeholder="Post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <textarea
          placeholder="Post content"
          rows="6"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />

        <button type="submit" disabled={loading}>
          {loading ? "Posting..." : "Create Post"}
        </button>
      </form>
    </div>
  );
};

export default AddPost;
