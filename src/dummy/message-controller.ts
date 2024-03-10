import { PrismaClient } from "@prisma/client";
import asyncHandler from "express-async-handler";

const prisma = new PrismaClient();

const sendMessage = asyncHandler(async (req, res) => {
  const { content, chatId } = req.body;

  if (!content || !chatId) {
    return res.status(400).json({ error: "Content and chatId are required" });
  }

  try {
    const newMessage = await prisma.message.create({
      data: {
        sender: {
          connect: {
            id: req.user._id,
          },
        },
        content,
        chat: {
          connect: {
            id: chatId,
          },
        },
      },
      include: {
        sender: {
          select: {
            firstname: true,
            picture: true,
          },
        },
        chat: true,
      },
    });

    await prisma.chat.update({
      where: {
        id: chatId,
      },
      data: {
        latestMessage: {
          connect: {
            id: newMessage.id,
          },
        },
      },
    });

    res.json(newMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const allMessages = asyncHandler(async (req, res) => {
  try {
    const messages = await prisma.message.findMany({
      where: {
        chatId: req.params.chatId,
      },
      include: {
        sender: {
          select: {
            firstname: true,
            picture: true,
            email: true,
          },
        },
        chat: true,
      },
    });

    res.json(messages);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

const updateMessage = asyncHandler(async (req, res) => {
  try {
    const { messageId, content } = req.body;

    const updatedMessage = await prisma.message.update({
      where: {
        id: messageId,
      },
      data: {
        content,
      },
    });

    res.json(updatedMessage);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

export { sendMessage, allMessages, updateMessage };
