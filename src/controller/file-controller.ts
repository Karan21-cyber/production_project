import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";
import { Request, Response } from "express";
import HttpException from "../utils/http-exception";

export const createfile = asyncHandler(async (req: Request, res: Response) => {
  const reqBody = req.body;
  const reqParams = req.params;
  const file = reqBody.name.trim().toLowerCase();

  const fileCreate = await prisma.file.create({
    data: { name: file, folderId: reqParams.folderId },
    select: {
      id: true,
      name: true,
      folderId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(201).json({
    success: true,
    message: "file created successfully",
    data: fileCreate,
  });
});

const getfileByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const file = await prisma.file.findMany({
    where: {
      folderId: id,
    },
    select: {
      id: true,
      name: true,
      folderId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!file) throw new HttpException(400, "file not found");

  return res.status(200).json({
    success: true,
    message: "file fetched successfully",
    data: file,
  });
});

export const updatefile = asyncHandler(async (req: Request, res: Response) => {
  const fileId = req.params;
  const reqBody = req.body;

  const file = await prisma.file.update({
    where: {
      id: fileId.id,
    },
    data: {
      name: reqBody.name,
    },
    select: {
      id: true,
      name: true,
      folderId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(201).json({
    success: true,
    message: "file updated successfully",
    data: file,
  });
});

const getAllFiles = asyncHandler(async (req: Request, res: Response) => {
  const files = await prisma.file.findMany({
    select: {
      id: true,
      name: true,
      folderId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    success: true,
    message: "files fetched successfully",
    data: files,
  });
});

const deletefile = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const file = await prisma.file.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      folderId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    success: true,
    message: "file fetched successfully",
    data: file,
  });
});

const fileController = {
  createfile,
  getfileByUserId,
  updatefile,
  deletefile,
  getAllFiles,
};

export default fileController;
