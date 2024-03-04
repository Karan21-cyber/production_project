import { Request, Response } from "express";
import bcrypt from "bcrypt";
import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";
import {
  getAccessToken,
  getAccessTokenAndRefereshToken,
  isRefereshTokenExpired,
} from "../service/get-token";
import HttpException from "../utils/http-exception";
import { getUserByEmail } from "../service/user-services";

const userLogin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const reqBody = req.body;
      const email = reqBody?.email.trim().toLowerCase();

      const user = await getUserByEmail(email);

      if (!user) throw new HttpException(400, "User not found");

      const comparePassword = await bcrypt.compare(
        reqBody?.password,
        user?.password
      );

      if (!comparePassword) throw new HttpException(400, "Invalid Credential.");

      const token = await getAccessTokenAndRefereshToken(user?.id);

      const options = {
        httpOnly: true,
        secure: true,
      };

      res
        .status(200)
        .cookie("accessToken", token?.accessToken, options)
        .cookie("refreshToken", token?.refreshToken, options)
        .json({
          success: true,
          message: "User logged in successfully",
          data: {
            id: user?.id,
            email: user?.email,
            name: user?.name,
            phone: user?.phone,
            image: user?.image,
            address: user?.address,
            token: token?.accessToken,
            refreshToken: token?.refreshToken,
            createdAt: user?.createdAt,
            updatedAt: user?.updatedAt,
          },
        });
    } catch (error) {
      console.log(error); // Call next with the error to propagate it to the error handler
    }
  }
);

const userLogOut = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { id } = req.params;

      const user = await prisma.user.findUnique({
        where: {
          id,
        },
      });

      if (!user) throw new HttpException(400, "User not found");

      await prisma.user.update({
        where: {
          id: user?.id,
        },
        data: {
          refreshToken: null || undefined || "",
        },
      });

      const options = { httpOnly: true, secure: true };

      res
        .status(200)
        .cookie("refreshToken", null, options)
        .cookie("accessToken", null, options)
        .json({
          success: true,
          message: "User logged out successfully",
        });
    } catch (error) {
      console.log(error); // Call next with the error to propagate it to the error handler
    }
  }
);

const refreshLogin = asyncHandler(
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { refreshToken } = req.query;

      if (typeof refreshToken !== "string") {
        throw new HttpException(400, "Invalid refresh token");
      }

      const user = await prisma.user.findFirst({
        where: {
          refreshToken,
        },
      });

      if (!user) {
        throw new HttpException(400, "User not found");
      }

      const isExpired = isRefereshTokenExpired(user?.refreshToken ?? "");

      if (isExpired) {
        await prisma.user.update({
          where: {
            id: user.id,
          },
          data: {
            refreshToken: null, // Assuming you want to set it to null if expired
          },
        });

        const options = { httpOnly: true, secure: true };

        res
          .status(401)
          .cookie("refreshToken", null, options)
          .cookie("accessToken", null, options)
          .json({
            success: false,
            message: "Refresh token expired. Please login again.",
          });
      } else {
        const accessToken = getAccessToken(user.id);
        const options = { httpOnly: true, secure: true };

        res.cookie("accessToken", accessToken, options).status(200).json({
          success: true,
          data: {
            accessToken,
          },
        });
      }
    } catch (error) {
      console.log(error); // Call next with the error to propagate it to the error handler
    }
  }
);

const authController = { userLogin, userLogOut, refreshLogin };

export default authController;
