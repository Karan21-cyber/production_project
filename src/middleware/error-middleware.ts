/* eslint-disable @typescript-eslint/no-explicit-any */
import { type Request, type Response } from "express";
import HttpException from "../utils/http-exception";

const errorMiddleware = (err: any, req: Request, res: Response) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal server error",
  });
};

export default errorMiddleware;
