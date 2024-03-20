import express, { Request, Response } from "express";
import http from "http"; // Import the http module
import prisma from "./prisma";
import errorMiddleware from "./middleware/error-middleware";
import authRouter from "./router/auth-router";
import createSubscriptionProduct from "./service/payment-sevices";
import userRouter from "./router/user-router";
import workspaceRouter from "./router/workspace-router";
import foldersRouter from "./router/folder-router";
import filesRouter from "./router/files-router";
import { Server, Socket } from "socket.io";

import cors from "cors";
import chatRouter from "./router/chat-router";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:4550",
    methods: ["GET", "POST"],
  },
});

app.use(cors());
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    Status_Code: 200,
    message: "Welcome to Production Project Server...",
  });
});

app.use(
  authRouter,
  userRouter,
  workspaceRouter,
  foldersRouter,
  filesRouter,
  chatRouter,
);
app.use(errorMiddleware);

createSubscriptionProduct();

// Connection event with authenticated sockets
io.on("connection", (socket: Socket) => {
  console.log("User Connected to (Server).");

  //Emit a "message" event to the client
  // socket.on("message", (message) => {
  //   console.log("Received From client: ", message);
  //   io.emit("message", message);
  // });

  // Your existing chat and disconnect event handlers
  // socket.on("chat", (args1) => {
  //   console.log("From server: ", args1);
  //   console.log("Received From client: ", args1);
  //   io.emit("chat", args1);
  // io.emit("chat", );
  // });

  // Emit a "setup" event to the client
  socket.on("setup", (user) => {
    socket.join(user._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room: " + room);
  });

  socket.on("typing", (room) => socket.in(room).emit("typing"));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on("new message", (newMessageReceived) => {
    const chat = newMessageReceived.chat;

    if (!chat.users) {
      console.log("chat.users not defined");
      return;
    }

    chat.user.forEach((user: { _id: string | string[] }) => {
      if (user._id === newMessageReceived.sender._id) {
        return;
      }
      socket.in(user._id).emit("message received", newMessageReceived);
    });
  });

  socket.on("disconnect", function () {
    console.log("user disconnected from (server)");
  });
});

const PORT = 5500;
prisma
  .$connect()
  .then(() => {
    server.listen(PORT, () => {
      console.log(`Server started on port ${PORT}`);
      console.log("socket is also running...");
    });
  })
  .catch(async (e: Error) => {
    console.log(e.message);
  });
