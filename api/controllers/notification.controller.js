import Notification from "../models/notification.model.js";
import { errorHandler } from "../utils/error.js";
import { parseISO, differenceInDays } from "date-fns";

export const addNotification = async (req, res, next) => {
  if (!req.body.content || req.body.content === "") {
    return next(errorHandler(400, "Content couldn't be null"));
  }

  const notification = new Notification({ ...req.body });

  try {
    const savedNotification = await notification.save();

    // Emit notification
    req.app.get("io").to(req.body.userId).emit("newComment", notification);

    res.status(201).json(savedNotification);
  } catch (err) {
    next(err);
  }
};

export const updateNotification = async (req, res, next) => {
  const notificationId = req.params.notificationId.slice(
    1,
    req.params.notificationId.length
  );
  const notification = Notification.findById(notificationId);
  if (notification.userId !== req.user.id) {
    return next(
      errorHandler(403, "You are not allowed to update this notification")
    );
  }
  try {
    const updatedNotification = await Notification.findByIdAndUpdate(
      notificationId,
      {
        $set: {
          isRead: req.body.isRead,
        },
      },
      { new: true }
    );
    res.status(200).json(updatedNotification);
  } catch (err) {
    next(err.message);
  }
};

export const getNotifications = async (req, res, next) => {
  try {
    const userId = req.query.userId;
    if (userId !== req.user.id) {
      return next(
        errorHandler(403, "You are not allowed to get others' notifications")
      );
    }

    const calDateDiff = (time) => {
      const now = new Date();
      const date = parseISO(time);
      return differenceInDays(now, date);
    };

    const notifications = await Notification.find({ userId: userId })
      .filter((item) => calDateDiff(item.createdAt) <= 30)
      .sort({ createdAt: 1 });
    res.status(200).json({ notifications });
  } catch (err) {
    next(err);
  }
};
