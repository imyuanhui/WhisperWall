import express from "express";
import { verifyToken } from "../utils/verifyUser.js";
import {
  addNotification,
  updateNotification,
  getNotifications,
} from "../controllers/notification.controller.js";

const router = express.Router();

router.post("/add-notification", addNotification);
router.put(
  "/update-notification/:notificationId",
  verifyToken,
  updateNotification
);
router.get("/get-notifications", verifyToken, getNotifications);

export default router;
