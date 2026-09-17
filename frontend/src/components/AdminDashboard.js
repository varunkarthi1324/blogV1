import React, { useEffect, useState } from "react";
import axios from "axios";

const AdminDashboard = () => {
  const [overview, setOverview] = useState({ users: [], posts: [] });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [deletingUserId, setDeletingUserId] = useState("");

  useEffect(() => {
    const loadOverview = async () => {
      setIsLoading(true);
      setError("");
      try {
        const { data } = await axios.get("/admin/overview", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setOverview(data);
      } catch (requestError) {
        console.error(
          "Error loading admin overview:",
          requestError.response?.data || requestError.message,
        );
        setError("We could not load the admin overview.");
      } finally {
        setIsLoading(false);
      }
    };

    loadOverview();
  }, []);

  const handleDelete = async (postId) => {
    setDeletingId(postId);
    try {
      await axios.delete(`/admin/posts/${postId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOverview((current) => ({
        ...current,
        posts: current.posts.filter((post) => post._id !== postId),
      }));
    } catch (requestError) {
      console.error(
        "Error deleting post:",
        requestError.response?.data || requestError.message,
      );
      setError("The post could not be deleted.");
    } finally {
      setDeletingId("");
    }
  };

  const handleDeleteUser = async (userId) => {
    setDeletingUserId(userId);
    setError("");
    try {
      await axios.delete(`/admin/users/${userId}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setOverview((current) => ({
        users: current.users.filter((user) => user._id !== userId),
        posts: current.posts.filter((post) => post.author?._id !== userId),
      }));
    } catch (requestError) {
      console.error(
        "Error deleting user:",
        requestError.response?.data || requestError.message,
      );
      setError(
        requestError.response?.data?.message ||
          "The user could not be deleted.",
      );
    } finally {
      setDeletingUserId("");
    }
  };

  if (isLoading) {
    return (
      <section className="loading-panel" aria-live="polite">
        <span className="loading-spinner loading-spinner-dark" />
        Loading admin workspace...
      </section>
    );
  }

  return (
    <section className="admin-page">
      <div className="page-heading">
        <span className="eyebrow">Control room</span>
        <h1>Admin workspace</h1>
        <p>Keep an eye on the people and ideas shaping your publication.</p>
      </div>
      {error && <p className="form-error admin-error">{error}</p>}
      <div className="stat-grid">
        <div className="stat-card">
          <span className="stat-label">Members</span>
          <strong>{overview.users.length}</strong>
        </div>
        <div className="stat-card stat-card-warm">
          <span className="stat-label">Published posts</span>
          <strong>{overview.posts.length}</strong>
        </div>
      </div>
      <div className="admin-grid">
        <section className="admin-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Directory</span>
              <h2>Members</h2>
            </div>
          </div>
          <div className="member-list">
            {overview.users.map((user) => (
              <div className="member-row" key={user._id}>
                <span className="avatar">
                  {user.name?.charAt(0).toUpperCase()}
                </span>
                <div>
                  <strong>{user.name}</strong>
                  <span>{user.email}</span>
                </div>
                <span className={`role-pill role-${user.role}`}>
                  {user.role}
                </span>
                <button
                  type="button"
                  className="button button-danger"
                  onClick={() => handleDeleteUser(user._id)}
                  disabled={deletingUserId === user._id}
                >
                  {deletingUserId === user._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        </section>
        <section className="admin-panel">
          <div className="panel-heading">
            <div>
              <span className="eyebrow">Moderation</span>
              <h2>Published posts</h2>
            </div>
          </div>
          <div className="admin-post-list">
            {overview.posts.map((post) => (
              <div className="admin-post-row" key={post._id}>
                <div>
                  <strong>{post.title}</strong>
                  <span>{post.author?.name || "Unknown author"}</span>
                </div>
                <button
                  type="button"
                  className="button button-danger"
                  onClick={() => handleDelete(post._id)}
                  disabled={deletingId === post._id}
                >
                  {deletingId === post._id ? "Deleting..." : "Delete"}
                </button>
              </div>
            ))}
          </div>
        </section>
      </div>
    </section>
  );
};

export default AdminDashboard;
