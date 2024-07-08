import express from "express";
import {
  deleteUser,
  signout,
  test,
  updateUser,
  getUsers,
} from "../controllers/User.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();

router.get("/test", test);
router.put("/update/:userId", verifyToken, updateUser);
router.delete("/delete/:userId", verifyToken, deleteUser);
router.post("/signout", signout);
router.get("/get-users", verifyToken, getUsers);

export default router;
