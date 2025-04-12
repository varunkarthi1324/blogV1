import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Assume you store the userId (author) and token in localStorage
      const author = localStorage.getItem("userId");
      const token = localStorage.getItem("token");
      const config = { headers: { Authorization: `Bearer ${token}` } };

      await axios.post(
        "http://localhost:5000/api/posts",
        { title, content, author },
        config
      );
      alert("Post created successfully");
      navigate("/posts"); // Redirect to the posts page
    } catch (error) {
      console.error(
        "Error creating post:",
        error.response?.data || error.message
      );
      alert("Error creating post");
    }
  };

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h2>Create Post</h2>
      <form
        onSubmit={handleSubmit}
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ padding: "10px", width: "80%", margin: "10px 0" }}
        />
        <textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          style={{ padding: "10px", width: "80%", margin: "10px 0" }}
        />
        <button
          type="submit"
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Create Post
        </button>
      </form>
    </div>
  );
};

export default CreatePost;
