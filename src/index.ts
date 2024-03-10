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
import membersRouter from "./router/member-router";
import { Server } from "socket.io";

import cors from "cors";

const app = express();
const server = http.createServer(app);
const io = new Server(server);

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
  membersRouter
);
app.use(errorMiddleware);

createSubscriptionProduct();

io.on("connection", (socket) => {
  console.log("user connected");

  socket.on("chat", (message) => {
    console.log("From server: ", message);
  });

  socket.on("disconnect", function () {
    console.log("user disconnected");
  });
});

prisma
  .$connect()
  .then(() => {
    server.listen(5500, () => {
      console.log("Server started on port 5500");
      console.log("socket is also running...");
    });
  })
  .catch(async (e: Error) => {
    console.log(e.message);
  });
