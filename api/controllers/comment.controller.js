import Comment from "../models/comment.model.js";
import { errorHandler } from "../utils/error.js";

export const addComment = async (req, res, next) => {
  if (!req.body.content || req.body.content === "") {
    return next(errorHandler(400, "Content couldn't be null"));
  }

  const newComment = new Comment({
    ...req.body,
    userId: req.user.id,
  });

  try {
    const savedComment = await newComment.save();
    res.status(201).json(savedComment);
  } catch (err) {
    next(err);
  }
};

export const getComments = async (req, res, next) => {
  try {
    const comments = await Comment.find({
      postId: req.query.postId,
    });
    res.status(200).json({ comments });
  } catch (err) {
    next(err);
  }
};

export const deleteComment = async (req, res, next) => {
  try {
  } catch (err) {
    next(err);
  }
};
