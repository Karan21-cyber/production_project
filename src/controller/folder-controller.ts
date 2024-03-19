import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";
import { Request, Response } from "express";
import HttpException from "../utils/http-exception";

export const createfolder = asyncHandler(
  async (req: Request, res: Response) => {
    const reqBody = req.body;
    const reqParams = req.params;
    const folderName = reqBody.name.trim().toLowerCase();

    const folderExist = await prisma.folder.findFirst({
      where: {
        workspaceId: reqParams.workspaceId,
        name: folderName,
      },
    });

    if (folderExist) {
      return res.status(201).json({
        success: false,
        message: "folder already exist",
      });
    }

    const folderCreate = await prisma.folder.create({
      data: { name: folderName, workspaceId: reqParams.workspaceId },
      select: {
        id: true,
        name: true,
        workspaceId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "folder created successfully",
      data: folderCreate,
    });
  }
);

const getfolderByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;
  const folder = await prisma.folder.findMany({
    where: {
      workspaceId: id,
    },
    select: {
      id: true,
      name: true,
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!folder) throw new HttpException(400, "folder not found");

  return res.status(200).json({
    success: true,
    message: "folder fetched successfully",
    data: folder,
  });
});

const getAllFolder = asyncHandler(async (req: Request, res: Response) => {
  const folder = await prisma.folder.findMany({
    select: {
      id: true,
      name: true,
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.status(200).json({
    success: true,
    message: "folder fetched successfully",
    data: folder,
  });
});

export const updatefolder = asyncHandler(
  async (req: Request, res: Response) => {
    const folderId = req.params;
    const reqBody = req.body;

    const folder = await prisma.folder.update({
      where: {
        id: folderId.id,
      },
      data: {
        name: reqBody.name,
      },
      select: {
        id: true,
        name: true,
        workspaceId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "folder updated successfully",
      data: folder,
    });
  }
);

const deletefolder = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const folder = await prisma.folder.delete({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    success: true,
    message: "folder fetched successfully",
    data: folder,
  });
});

const folderController = {
  createfolder,
  getfolderByUserId,
  updatefolder,
  deletefolder,
  getAllFolder,
};

export default folderController;
