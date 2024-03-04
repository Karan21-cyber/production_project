/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";
import prisma from "../prisma";

export const getAccessTokenAndRefereshToken = async (userId: string) => {
  try {
    const accessToken = getAccessToken(userId);
    const refreshToken = getRefreshToken(userId);

    await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        refreshToken,
      },
    });

    return {
      accessToken,
      refreshToken,
    };
  } catch (err: any) {
    console.log(err);
  }
};

export const getAccessToken = (userId: string) => {
  const token = jwt.sign(
    { data: userId, iat: Date.now() },
    process.env.ACCESS_TOKEN_KEY!,
    {
      expiresIn: "1h",
    }
  );
  return token;
};

export const getRefreshToken = (userId: string) => {
  const token = jwt.sign(
    { data: userId, iat: Date.now() },
    process.env.REFRESH_TOKEN_KEY!,
    {
      expiresIn: "10d",
    }
  );

  return token;
};

export const isRefereshTokenExpired = (refreshToken: string) => {
  try {
    const decoded = jwt.verify(refreshToken, process.env.SECRET_TOKEN_KEY!);
    return decoded;
  } catch (err: any) {
    return false;
  }
};
