import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = ({ showToast }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      // Assume you store the userId (author) and token in localStorage
      const author = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.post("/posts", { title, content, author }, config);
      showToast("Post created successfully.");
      navigate("/posts"); // Redirect to the posts page
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message,
      );
      showToast("Unable to create the post.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="editor-page">
      <div className="page-heading">
        <span className="eyebrow">Publish something meaningful</span>
        <h1>Create a post</h1>
        <p>Turn a passing thought into something worth returning to.</p>
      </div>
      <form onSubmit={handleSubmit} className="editor-card">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input-field"
          required
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="input-field input-textarea"
          required
        />
        <button
          type="submit"
          className="button button-primary"
          disabled={isSubmitting}
          aria-busy={isSubmitting}
        >
          {isSubmitting && (
            <span className="loading-spinner" aria-hidden="true" />
          )}
          {isSubmitting ? "Creating..." : "Create Post"}
        </button>
      </form>
    </section>
  );
};

export default CreatePost;
