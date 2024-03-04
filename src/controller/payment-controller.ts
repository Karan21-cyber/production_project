import { Request, Response } from "express";
import asyncHandler from "../utils/async-handler";

const publishableKey = process.env.STRIPE_PUBLISHED_KEY;

export const getPusblishedKey = asyncHandler(async (req: Request, res: Response) => {
  try {
    console.log(publishableKey);
    res.status(200).json({
      success: true,
      message: "Get your publishable key",
      data: publishableKey,
    });
  } catch (error) {
    console.log(error);
  }
});
