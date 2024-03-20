// import prisma from "../prisma";
// import asyncHandler from "../utils/async-handler";
// import { Request, Response } from "express";

// // Handler function to create a new message in the chat
// const createChatMessage = asyncHandler(async (req: Request, res: Response) => {
//   try {
//     const { content, chatId } = req.body;

//     if (!content || !chatId) {
//       return res.sendStatus(400);
//     }

//     // Create a new message in the database using Prisma
//     const newMessage = await prisma.message.create({
//       data: {
//         content,
//         chat: {
//           connect: { id: chatId },
//         },
//         sender: {
//           connect: { id: req.user._id }, // Assuming req.user._id is the sender's ID
//         },
//       },
//       include: {
//         sender: { select: { fname: true, picture: true } },
//         chat: true,
//       },
//     });

//     // Update the latestMessage field of the chat
//     await prisma.chat.update({
//       where: { id: chatId },
//       data: { latestMessage: newMessage },
//     });

//     // Populate additional fields for the message
//     const populatedMessage = await prisma.message.findUnique({
//       where: { id: newMessage.id },
//       include: {
//         sender: { select: { fname: true, picture: true } },
//         chat: { include: { users: { select: { fname: true, email: true } } } },
//       },
//     });

//     res.json(populatedMessage);
//   } catch (error) {
//     console.error("Error sending message:", error);
//     res
//       .status(400)
//       .send(error.message || "An error occurred while sending the message");
//   }
// });

// export const userChatController = {
//   createChatMessage,
// };
