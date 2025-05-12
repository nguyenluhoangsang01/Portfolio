import express from "express";
import {
	createPost,
	deletePost,
	getPost,
	getPosts,
	getPostsByCategory,
	getPostsByTag,
	updatePost,
} from "../controllers/post.js";

const router = express.Router();

// @route POST api/post
// @desc Create a post
// @access Public
router.post("/", createPost);

// @route GET api/post
// @desc Get all posts
// @access Public
router.get("/", getPosts);

// @route GET api/post/:id
// @desc Get a post by ID
// @access Public
router.get("/:id", getPost);

// @route GET api/post/category/:category
// @desc Get posts by category
// @access Public
router.get("/category/:category", getPostsByCategory);

// @route GET api/post/tag/:tag
// @desc Get posts by tag
// @access Public
router.get("/tag/:tag", getPostsByTag);

// @route PUT api/post/:id
// @desc Update a post by ID
// @access Public
router.patch("/:id", updatePost);

// @route DELETE api/post/:id
// @desc Delete a post by ID
// @access Public
router.delete("/:id", deletePost);

export default router;
