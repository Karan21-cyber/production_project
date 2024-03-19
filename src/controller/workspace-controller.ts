import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";
import { Request, Response } from "express";
import HttpException from "../utils/http-exception";

export const createWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const reqBody = req.body;
    const reqParams = req.params;
    const workspace = reqBody.name.trim().toLowerCase();

    const workspaceExist = await prisma.workspace.findFirst({
      where: {
        userId: reqParams.userId,
      },
    });

    if (workspaceExist) {
      return res.status(201).json({
        success: false,
        message: "Workspace already exist",
      });
    }

    const workspaceCreate = await prisma.workspace.create({
      data: { name: workspace, userId: reqParams.userId },
      select: {
        id: true,
        name: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    const member = await prisma.members.create({
      data: {
        workspaceId: workspaceCreate.id,
        userId: workspaceCreate.userId,
      },
    });

    if (member) {
      console.log("member created successfully.");
    }

    return res.status(201).json({
      success: true,
      message: "Workspace created successfully",
      data: workspaceCreate,
    });
  }
);

const getWorkspaceByUserId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const workspace = await prisma.workspace.findMany({
      where: {
        userId: id,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!workspace) throw new HttpException(400, "Workspace not found");

    return res.status(200).json({
      success: true,
      message: "Workspace fetched successfully",
      data: workspace,
    });
  }
);

export const updateWorkspace = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const reqBody = req.body;

    const workspace = await prisma.workspace.update({
      where: {
        id: id,
      },
      data: {
        name: reqBody.name,
      },
      select: {
        id: true,
        name: true,
        userId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "Workspace updated successfully",
      data: workspace,
    });
  }
);

const getAllWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const workspace = await prisma.workspace.findMany({
    select: {
      id: true,
      name: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.status(200).json({
    success: true,
    message: "Workspace fetched successfully",
    data: workspace,
  });
});

const deleteWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const workId = req.params;

  await prisma.workspace.delete({
    where: {
      id: workId.id,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Workspace deleted successfully",
  });
});

const workspaceController = {
  createWorkspace,
  getWorkspaceByUserId,
  updateWorkspace,
  deleteWorkspace,
  getAllWorkspace,
};

export default workspaceController;
