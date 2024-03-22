import { Request, Response } from "express";
import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";

const getChatsById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const allUsers = await prisma.chat.findMany({
    where: {
      OR: [{ groupAdmin: id }],
    },
    select: {
      id: true,
      chatName: true,
      groupAdmin: true,
      createdAt: true,
      updatedAt: true,
      latestMessage: true,
    },
  });
  return res.status(200).json({
    success: true,
    message: "Chats fetched successfully",
    data: allUsers,
  });
});

const chatController = {
  getChatsById,
};

export default chatController;
