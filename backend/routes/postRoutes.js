const express = require("express");
const Post = require("../models/Post");
const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
  const { title, content, author } = req.body;
  try {
    const post = await Post.create({ title, content, author });
    res.status(201).json(post);
  } catch (error) {
    console.error("Error creating post:", error.message);
    res.status(400).json({ error: error.message });
  }
});

// Get all posts sorted by creation date (newest first)
router.get("/", async (req, res) => {
  try {
    // Populate author name if needed.
    const posts = await Post.find()
      .sort({ createdAt: -1 })
      .populate("author", "name");
    res.status(200).json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error.message);
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
