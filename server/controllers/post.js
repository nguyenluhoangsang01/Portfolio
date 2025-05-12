import sendError from "../helpers/sendError.js";
import sendSuccess from "../helpers/sendSuccess.js";
import Post from "../models/Post.js";

export const createPost = async (req, res, next) => {
	try {
		const { title, content, tag, category } = req.body;

		if (!title) return sendError(res, "Title can not be blank", 400, "title");
		if (!content)
			return sendError(res, "Content can not be blank", 400, "content");
		if (!tag) return sendError(res, "Tag can not be blank", 400, "tag");
		if (!category)
			return sendError(res, "Category can not be blank", 400, "category");

		// Create new post
		const newPost = await Post.create({ ...req.body });
		await newPost.save();

		// Find all posts
		const posts = await Post.find().select("-__v");

		return sendSuccess(
			res,
			"Post created successfully",
			{ length: posts.length, posts },
			201
		);
	} catch (error) {
		next(error);
	}
};

export const getPosts = async (req, res, next) => {
	try {
		const posts = await Post.find().select("-__v");

		if (!posts.length) return sendError(res, "No posts found", 404, "posts");

		return sendSuccess(
			res,
			"Posts fetched successfully",
			{ length: posts.length, posts },
			200
		);
	} catch (error) {
		next(error);
	}
};

export const getPost = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) return sendError(res, "Post ID can not be blank", 400, "id");

		const post = await Post.findById(id).select("-__v");

		if (!post) return sendError(res, "Post not found", 404, "post");

		return sendSuccess(res, "Post fetched successfully", { post }, 200);
	} catch (error) {
		next(error);
	}
};

export const updatePost = async (req, res, next) => {
	try {
		const { id } = req.params;
		const { title, content, tag, category } = req.body;

		if (!id) return sendError(res, "Post ID can not be blank", 400, "id");
		if (!title) return sendError(res, "Title can not be blank", 400, "title");
		if (!content)
			return sendError(res, "Content can not be blank", 400, "content");
		if (!tag) return sendError(res, "Tag can not be blank", 400, "tag");
		if (!category)
			return sendError(res, "Category can not be blank", 400, "category");

		const post = await Post.findByIdAndUpdate(id, req.body, {
			new: true,
			runValidators: true,
		}).select("-__v");

		if (!post) return sendError(res, "Post not found", 404, "post");

		return sendSuccess(res, "Post updated successfully", { post }, 200);
	} catch (error) {
		next(error);
	}
};

export const deletePost = async (req, res, next) => {
	try {
		const { id } = req.params;

		if (!id) return sendError(res, "Post ID can not be blank", 400, "id");

		const post = await Post.findByIdAndDelete(id).select("-__v");

		if (!post) return sendError(res, "Post not found", 404, "post");

		return sendSuccess(res, "Post deleted successfully", { post }, 200);
	} catch (error) {
		next(error);
	}
};

export const getPostsByCategory = async (req, res, next) => {
	try {
		const { category } = req.params;

		if (!category)
			return sendError(res, "Category can not be blank", 400, "category");

		const posts = await Post.find({ category }).select("-__v");

		if (!posts.length) return sendError(res, "No posts found", 404, "posts");

		return sendSuccess(
			res,
			"Posts fetched successfully",
			{ length: posts.length, posts },
			200
		);
	} catch (error) {
		next(error);
	}
};

export const getPostsByTag = async (req, res, next) => {
	try {
		const { tag } = req.params;

		if (!tag) return sendError(res, "Tag can not be blank", 400, "tag");

		const posts = await Post.find({ tag: tag }).select("-__v");

		if (!posts.length) return sendError(res, "No posts found", 404, "posts");

		return sendSuccess(
			res,
			"Posts fetched successfully",
			{ length: posts.length, posts },
			200
		);
	} catch (error) {
		next(error);
	}
};
