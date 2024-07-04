import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  getComments,
  addComment,
  deleteComment,
} from "../controllers/comment.controller.js";

const router = express.Router();

router.get("/get-comments", getComments);
router.post("/add-comment", verifyToken, addComment);
router.delete("/delete-comment/:commentId", verifyToken, deleteComment);

export default router;
