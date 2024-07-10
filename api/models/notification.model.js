import mongoose from "mongoose";

const notificationSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true },
    postId: { type: String, required: true },
    commentId: { type: String, required: true },
    message: { type: String, required: true },
    isRead: { type: Boolean, required: true },
  },
  { timestamps: true }
);

const Notification = mongoose.model("Notification", notificationSchema);

export default Notification;
