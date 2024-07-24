import express, { text } from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/User.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";
import postRoutes from "./routes/post.route.js";
import commentRoutes from "./routes/comment.route.js";
import notificationRoutes from "./routes/notification.route.js";
import path from "path";
import { Server } from "socket.io";

dotenv.config();

mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB is connected");
  })
  .catch((err) => {
    console.log(err);
  });

const __dirname = path.resolve();

const app = express();

const expressServer = app.listen(3000, () => {
  console.log("Server is running on port 3000!!");
});

const io = new Server(
  expressServer
  // ,
  // {
  //   cors: {
  //   origin: "http://localhost:5173",
  //   methods: ["GET", "POST"],
  //   credentials: true,
  // },
  // }
);

app.use(express.json());
app.use(cookieParser());

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/post", postRoutes);
app.use("/api/comment", commentRoutes);
app.use("/api/notification", notificationRoutes);

app.use(express.static(path.join(__dirname, "client/dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "dist", "index.html"));
});

app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internet Server Error";
  res.status(statusCode).json({
    success: false,
    statusCode,
    message,
  });
});

let users = [];

const setUsers = (newUsers) => {
  users = newUsers;
};

io.on("connection", (socket) => {
  console.log(`User ${socket.id} connected, Users: ${users[0]?.id}`);

  socket.on("joinChannel", ({ pseudonym, channel }) => {
    const prevChannel = getUser(socket.id)?.channel;
    if (prevChannel) {
      socket.leave(prevChannel);
      io.to(prevChannel).emit("message", {
        author: "Admin",
        text: `${pseudonym} has left this channel.`,
        time: new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date()),
      });
    }
    const user = activateUser(socket.id, pseudonym, channel);

    if (prevChannel) {
      io.to(prevChannel).emit("channelData", {
        users: getUsers(prevChannel),
      });
    }

    socket.join(user.channel);

    console.log(`User ${socket.id} joined, Users: ${users.length}`);

    socket.emit("message", {
      author: "Admin",
      text: `Welcome to ${channel} channel.`,
    });
    socket.broadcast.to(user.channel).emit("message", {
      author: "Admin",
      text: `${user.pseudonym} has joined this channel.`,
      time: new Intl.DateTimeFormat("default", {
        hour: "numeric",
        minute: "numeric",
        second: "numeric",
      }).format(new Date()),
    });

    io.to(user.channel).emit("channelData", {
      users: getUsers(user.channel),
    });
  });

  socket.on("disconnect", () => {
    const user = getUser(socket.id);
    disconnectUser(socket.id);

    if (user) {
      io.to(user.channel).emit("message", {
        author: "Admin",
        text: `${user.pseudonym} has left this channel.`,
        time: new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date()),
      });

      io.to(user.channel).emit("channelData", {
        users: getUsers(user.channel),
      });
    }

    console.log(`User ${socket.id} disconnected.`);
  });

  socket.on("message", ({ author, text }) => {
    const channel = getUser(socket.id)?.channel;
    console.log(
      `User ${socket.id} send a message: ${author} says ${text} at channel ${channel}`
    );
    if (channel) {
      io.to(channel).emit("message", {
        author,
        text,
        time: new Intl.DateTimeFormat("default", {
          hour: "numeric",
          minute: "numeric",
          second: "numeric",
        }).format(new Date()),
      });
    }
  });
});

// app.set("io", io);

const activateUser = (id, pseudonym, channel) => {
  const user = { id, pseudonym, channel };
  setUsers([...users.filter((user) => user.id !== id), user]);
  return user;
};

const disconnectUser = (id) => {
  setUsers(users.filter((user) => user.id !== id));
};

const getUser = (id) => {
  return users.find((user) => user.id === id);
};

const getUsers = (channel) => {
  return users.filter((user) => user.channel === channel);
};
