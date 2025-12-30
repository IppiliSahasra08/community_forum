import { useEffect, useState } from "react";
import { collection, onSnapshot, doc, deleteDoc } from "firebase/firestore";
import { db } from "../firebase";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  // ✅ DELETE FUNCTION (outside useEffect)
  const deletePost = async (id) => {
    if (!window.confirm("Delete this post?")) return;
    await deleteDoc(doc(db, "posts", id));
  };

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "posts"), (snapshot) => {
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
        </div>
      ))}
    </>
  );
};

export default PostList;
