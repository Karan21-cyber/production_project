import { Request, Response, NextFunction } from "express";
import { AnyZodObject, ZodError } from "zod";

interface ZodValidationError {
  success: false;
  message: string;
  issues: ZodError;
}

const validationMiddleware = (schema: AnyZodObject) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        params: req.params,
        query: req.query,
      });
      next();
    } catch (error) {
      const validationError: ZodValidationError = {
        success: false,
        message: (error as ZodError).issues[0]?.message || "Validation failed",
        issues: error as ZodError,
      };
      return res.status(400).json(validationError);
    }
  };
};

export default validationMiddleware;
