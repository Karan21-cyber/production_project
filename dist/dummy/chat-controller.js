"use strict";
// import prisma from "../prisma";
// import asyncHandler from "../utils/async-handler";
// import { Request, Response } from "express";
// const accessChat = asyncHandler(async (req: Request, res: Response) => {
//   const { userId } = req.body;
//   if (!userId) {
//     console.log("UserId param not sent with request");
//     return res.sendStatus(400);
//   }
//   try {
//     const isChat = await prisma.chat.findMany({
//       where: {
//         isGroupChat: false,
//         users: {
//           some: { id: req.user.id },
//         },
//       },
//       include: {
//         users: true,
//         latestMessage: true,
//       },
//     });
//     if (isChat.length > 0) {
//       res.send(isChat[0]);
//     } else {
//       const chatData = {
//         chatName: "sender",
//         isGroupChat: false,
//         users: { connect: [{ id: req.user.id }, { id: userId }] },
//       };
//       const createdChat = await prisma.chat.create({
//         data: chatData,
//         include: {
//           users: true,
//         },
//       });
//       res.status(200).send(createdChat);
//     }
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// const fetchChats = asyncHandler(async (req, res) => {
//   try {
//     const result = await prisma.chat.findMany({
//       where: {
//         users: {
//           some: { id: req.user.id },
//         },
//       },
//       include: {
//         users: true,
//         groupAdmin: true,
//         latestMessage: {
//           include: {
//             sender: true,
//           },
//         },
//       },
//       orderBy: {
//         updatedAt: "desc",
//       },
//     });
//     res.status(200).send(result);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// const createGroup = asyncHandler(async (req, res) => {
//   try {
//     const { users: usersString, name } = req.body;
//     if (!usersString || !name) {
//       return res.status(400).send({ message: "Please Fill all the fields" });
//     }
//     const users = JSON.parse(usersString);
//     if (users.length < 2) {
//       return res
//         .status(400)
//         .send({ message: "More than 2 users need to create Group Chat" });
//     }
//     const groupchat = await prisma.chat.create({
//       data: {
//         chatName: name,
//         users: {
//           connect: users.map((userId) => ({ id: userId })),
//         },
//         isGroupChat: true,
//         groupAdmin: { connect: { id: req.user.id } },
//       },
//       include: {
//         users: true,
//         groupAdmin: true,
//       },
//     });
//     res.status(200).json(groupchat);
//   } catch (error) {
//     res.status(400).json({ error: error.message });
//   }
// });
// const renameGroup = asyncHandler(async (req, res) => {
//   const { chatId, chatName } = req.body;
//   try {
//     const updateChat = await prisma.chat.update({
//       where: { id: chatId },
//       data: {
//         chatName,
//       },
//       include: {
//         users: true,
//         groupAdmin: true,
//       },
//     });
//     res.json(updateChat);
//   } catch (error) {
//     res.status(404).json({ error: "Chat Not found" });
//   }
// });
// const removeGroup = asyncHandler(async (req, res) => {
//   const { chatId } = req.body;
//   try {
//     const deleteChat = await prisma.chat.delete({
//       where: { id: chatId },
//     });
//     res.status(200).json({
//       success: "Chat Group Remove success",
//     });
//   } catch (error) {
//     res.status(404).json({ error: "Group Not Found" });
//   }
// });
// const addtoGroup = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;
//   try {
//     const added = await prisma.chat.update({
//       where: { id: chatId },
//       data: {
//         users: {
//           connect: { id: userId },
//         },
//       },
//       include: {
//         users: true,
//         groupAdmin: true,
//       },
//     });
//     res.json(added);
//   } catch (error) {
//     res.status(404).json({ error: "Chat Not Found" });
//   }
// });
// const removeFromGroup = asyncHandler(async (req, res) => {
//   const { chatId, userId } = req.body;
//   try {
//     const remove = await prisma.chat.update({
//       where: { id: chatId },
//       data: {
//         users: {
//           disconnect: { id: userId },
//         },
//       },
//       include: {
//         users: true,
//         groupAdmin: true,
//       },
//     });
//     res.send(remove);
//   } catch (error) {
//     res.status(404).json({ error: "Chat Not found" });
//   }
// });
// module.exports = {
//   accessChat,
//   fetchChats,
//   createGroup,
//   renameGroup,
//   removeGroup,
//   addtoGroup,
//   removeFromGroup,
// };
