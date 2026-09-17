const express = require("express");
const Post = require("../models/Post");
const UserAuth = require("../models/UserAuth");
const authenticate = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/adminMiddleware");

const router = express.Router();

router.use(authenticate, requireAdmin);

router.get("/overview", async (req, res) => {
  try {
    const [users, posts] = await Promise.all([
      UserAuth.find().select("name email role").sort({ name: 1 }),
      Post.find().sort({ createdAt: -1 }).populate("author", "name email"),
    ]);

    res.status(200).json({ users, posts });
  } catch (error) {
    console.error("Error loading admin overview:", error.message);
    res.status(500).json({ message: "Unable to load admin overview." });
  }
});

router.delete("/posts/:id", async (req, res) => {
  try {
    const deletedPost = await Post.findByIdAndDelete(req.params.id);
    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json({ message: "Post deleted successfully." });
  } catch (error) {
    console.error("Error deleting post:", error.message);
    res.status(400).json({ message: "Unable to delete post." });
  }
});

module.exports = router;
