import { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc
} from "firebase/firestore";
import { db } from "../firebase";

const PostList = () => {
  const [posts, setPosts] = useState([]);
  const [comment, setComment] = useState({});
  const [comments, setComments] = useState({}); // 🔥 NEW

  // Delete post
  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "posts", id));
  };

  // Add comment
  const addComment = async (postId) => {
    if (!comment[postId]?.trim()) return;

    await addDoc(collection(db, "posts", postId, "comments"), {
      text: comment[postId],
      createdAt: new Date(),
    });

    setComment({ ...comment, [postId]: "" });
  };

  // Fetch posts + comments
  useEffect(() => {
    const unsubPosts = onSnapshot(collection(db, "posts"), (snapshot) => {
      const postsData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setPosts(postsData);

      // 🔥 Listen to comments for each post
      postsData.forEach((post) => {
        onSnapshot(
          collection(db, "posts", post.id, "comments"),
          (commentSnap) => {
            setComments((prev) => ({
              ...prev,
              [post.id]: commentSnap.docs.map((d) => ({
                id: d.id,
                ...d.data(),
              })),
            }));
          }
        );
      });
    });

    return () => unsubPosts();
  }, []);

  return (
    <>
      {posts.length === 0 && <p>No posts yet</p>}

      {posts.map((post) => (
        <div className="topic-card" key={post.id}>
          <h4>{post.title}</h4>
          <p>{post.content}</p>

          <button
            onClick={() => deletePost(post.id)}
            style={{ color: "red" }}
          >
            Delete
          </button>

          <hr />

          {/* 🧵 Comment Input */}
          <input
            placeholder="Add a comment"
            value={comment[post.id] || ""}
            onChange={(e) =>
              setComment({ ...comment, [post.id]: e.target.value })
            }
          />

          <button type="button" onClick={() => addComment(post.id)}>
            Comment
          </button>

          {/* 🧵 SHOW COMMENTS */}
          {comments[post.id]?.map((c) => (
            <div
              key={c.id}
              style={{
                marginLeft: "20px",
                marginTop: "6px",
                fontSize: "14px",
                color: "#444",
              }}
            >
              💬 {c.text}
            </div>
          ))}
        </div>
      ))}
    </>
  );
};

export default PostList;
