import { Request, Response } from "express";
import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";

const createChat = asyncHandler(async (req: Request, res: Response) => {
  // const reqBody = req.body;

  // const chats = await prisma.chat.create({
  //   data: {
  //     chatName: reqBody?.chatName,
  //   },
  // });

  // if (chats) {
  //   console.log("chats created successfully");
  // }

  return res.status(201).json({
    success: true,
    message: "member created successfully",
    // data: chats,
  });
});

const getChatById = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const chat = await prisma.chat.findMany({
    where: {
      id: id,
    },
    // select: {
    //   id: true,
    //   user: {
    //     select: {
    //       id: true,
    //       fname: true,
    //       lname: true,
    //       email: true,
    //       phone: true,
    //       address: true,
    //       image: true,
    //       createdAt: true,
    //       updatedAt: true,
    //     },
    //   },
    //   latestMessage: true,
    //   createdAt: true,
    //   updatedAt: true,
    // },
  });
  return res.status(200).json({
    success: true,
    message: "chat fetched successfully",
    data: chat,
  });
});

const chatController = { getChatById, createChat };

export default chatController;
