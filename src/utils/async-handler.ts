import { type Request, type Response, type NextFunction } from "express";

const asyncHandler = (controller: (req: Request, res: Response, next: NextFunction) => Promise<void>) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await controller(req, res, next);
    } catch (error: unknown) {
      console.log("Error", error);
      next(error);
    }
  };
};

export default asyncHandler;
