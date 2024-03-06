import express, { type Request, type Response } from "express";
import prisma from "./prisma";
import errorMiddleware from "./middleware/error-middleware";
import authRouter from "./router/auth-router";
import createSubscriptionProduct from "./service/payment-sevices";
import userRouter from "./router/user-router";
import workspaceRouter from "./router/workspace-router";
import foldersRouter from "./router/folder-router";
import filesRouter from "./router/files-router";
import membersRouter from "./router/member-router";

const app = express();
app.use(express.json());

app.get("/", (req: Request, res: Response) => {
  res.json({
    success: true,
    Status_Code: 200,
    message: "Welcome to Production Project Server...",
  });
});

app.use(authRouter, userRouter, workspaceRouter, foldersRouter, filesRouter,membersRouter);
app.use(errorMiddleware);

createSubscriptionProduct();

prisma
  .$connect()
  .then(() => {
    app.listen(5500, () => {
      console.log("Server started on port 5500");
    });
  })
  .catch(async (e: Error) => {
    console.log(e.message);
  });
