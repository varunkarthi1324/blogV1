import React, { useEffect, useState } from "react";
import axios from "axios";

const PostList = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("/posts")
      .then((response) => {
        setPosts(response.data);
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  return (
    <section className="feed-page">
      <div className="page-heading page-heading-row">
        <div>
          <span className="eyebrow">The latest thinking</span>
          <h1>Community posts</h1>
          <p>Fresh perspectives from the echofluxx community.</p>
        </div>
        <span className="post-count">{posts.length} posts</span>
      </div>
      {posts.length === 0 ? (
        <div className="empty-state">No posts available yet.</div>
      ) : (
        <div className="post-grid">
          {posts.map((post) => (
            <article className="post-card" key={post._id}>
              <span className="post-kicker">From the community</span>
              <h2>{post.title}</h2>
              <p className="post-content">{post.content}</p>
              <div className="post-meta">
                <span>{post.author?.name || "Anonymous"}</span>
                <span>
                  {new Date(post.createdAt).toLocaleDateString(undefined, {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
};

export default PostList;
