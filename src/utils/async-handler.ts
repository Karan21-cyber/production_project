/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response, NextFunction } from "express";

const asyncHandler = (controller: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res);
    } catch (err: any) {
      console.log("Error: ", err);
      return next(err);
    }
  };
};

export default asyncHandler;
