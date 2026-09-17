import React, { useEffect, useState } from "react";
import axios from "axios";

const POSTS_CACHE_KEY = "echofluxx-posts-cache";

const readCachedPosts = () => {
  try {
    const cached = JSON.parse(localStorage.getItem(POSTS_CACHE_KEY));
    return Array.isArray(cached?.posts) ? cached.posts : null;
  } catch {
    return null;
  }
};

const PostList = () => {
  const cachedPosts = readCachedPosts();
  const [posts, setPosts] = useState(cachedPosts || []);
  const [isLoading, setIsLoading] = useState(!cachedPosts);
  const [isRefreshing, setIsRefreshing] = useState(Boolean(cachedPosts));

  useEffect(() => {
    let isMounted = true;

    axios
      .get("/posts")
      .then((response) => {
        if (!isMounted) return;
        setPosts(response.data);
        localStorage.setItem(
          POSTS_CACHE_KEY,
          JSON.stringify({ posts: response.data, cachedAt: Date.now() }),
        );
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      })
      .finally(() => {
        if (!isMounted) return;
        setIsLoading(false);
        setIsRefreshing(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const renderPost = (post) => (
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
  );

  return (
    <section className="feed-page">
      <div className="page-heading page-heading-row">
        <div>
          <span className="eyebrow">The latest thinking</span>
          <h1>Community posts</h1>
          <p>Fresh perspectives from the echofluxx community.</p>
        </div>
        <span className="post-count">
          {isRefreshing ? "Updating..." : `${posts.length} posts`}
        </span>
      </div>
      {isLoading ? (
        <div className="post-grid" aria-label="Loading posts">
          {[1, 2, 3].map((skeleton) => (
            <div className="post-card post-skeleton" key={skeleton}>
              <span className="skeleton-line skeleton-kicker" />
              <span className="skeleton-line skeleton-title" />
              <span className="skeleton-line skeleton-copy" />
              <span className="skeleton-line skeleton-copy skeleton-copy-short" />
            </div>
          ))}
        </div>
      ) : posts.length === 0 ? (
        <div className="empty-state">No posts available yet.</div>
      ) : (
        <div className="post-grid">{posts.map(renderPost)}</div>
      )}
    </section>
  );
};

export default PostList;
