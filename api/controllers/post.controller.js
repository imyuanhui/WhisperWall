import Post from "../models/post.model.js";
import { errorHandler } from "../utils/error.js";

export const create = async (req, res, next) => {
  if (!req.body.content || req.body.content === "") {
    return next(errorHandler(400, "Content counld not be null"));
  }

  const slug = req.body.content
    .slice(0, 30)
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9]/g, "-");
  const newPost = new Post({
    ...req.body,
    userId: req.user.id,
    slug,
  });
  try {
    const savedPost = await newPost.save();
    res.status(201).json(savedPost);
  } catch (err) {
    next(err);
  }
};

export const getPosts = async (req, res, next) => {
  try {
    const startIndex = parseInt(req.query.startIndex) || 0;
    const limit = parseInt(req.query.limit) || 7;
    const sortDirection = req.query.order === "asc" ? 1 : -1;
    const reqTags = req.query.tags
      ? req.query.tags.toLowerCase().split(",")
      : [];
    const posts = await Post.find({
      ...(req.query.userId && { userId: req.query.userId }),
      ...(req.query.tags && { tags: { $in: reqTags } }),
      ...(req.query.postId && { _id: req.query.postId }),
    })
      .sort({ updatedAt: sortDirection })
      .skip(startIndex)
      .limit(limit);
    const total = await Post.countDocuments();
    res.status(200).json({
      posts,
      total,
    });
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  const postId = req.params.postId.slice(1, req.params.postId.length);
  const postToDel = await Post.findById(postId);
  console.log(req.user.isAdmin, req.user.id, postToDel.userId);

  if (!req.user.isAdmin && req.user.id !== postToDel.userId) {
    return next(errorHandler(403, "You are not allowed to delete this post"));
  }

  try {
    await Post.deleteOne({ _id: postId });
    res.status(200).json(`Post ${postId} has been deleted`);
  } catch (err) {
    next(err);
  }
};
