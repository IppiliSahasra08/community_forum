import { useEffect, useState } from "react";
import { collection, onSnapshot, orderBy, query } from "firebase/firestore";
import { db } from "../firebase";
import { useNavigate } from "react-router-dom";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(
      collection(db, "posts"),
      orderBy("createdAt", "desc")
    );

    const unsub = onSnapshot(q, (snapshot) => {
      setPosts(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
      );
    });

    return () => unsub();
  }, []);

  return (
    <div className="topics-left">
      <h4 className="section-label">Recently Active</h4>

      {posts.map((post) => (
        <div
          key={post.id}
          className="topic-card"
          onClick={() => navigate(`/post/${post.id}`)}
        >
          <h4>{post.title}</h4>
          <p>{post.content?.slice(0, 80)}...</p>
          <span className="meta">
            {post.replies || 0} replies
          </span>
        </div>
      ))}
    </div>
  );
};

export default PostList;
