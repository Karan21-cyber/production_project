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

const addUserInWorkspace = asyncHandler(async (req: Request, res: Response) => {
  const { workspaceId } = req.params;
  const { userId } = req.body;

  const workspace = await prisma.workspace.update({
    where: {
      id: workspaceId,
    },
    data: {
      users: {
        connect: {
          id: userId,
        },
      },
    },
    select: {
      id: true,
      name: true,
      userId: true,
      createdAt: true,
      updatedAt: true,
      users: {
        select: {
          id: true,
          fname: true,
          lname: true,
          email: true,
          phone: true,
          verified: true,
          address: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!workspace) throw new HttpException(400, "Workspace not found");

  const createChat = await prisma.chat.create({
    data: {
      chatName: workspace?.users[0]?.fname + " " + workspace?.users[0]?.lname,
      groupAdmin: workspace?.userId,
      users: {
        connect: {
          id: workspace?.id,
        },
      },
    },
  });

  if (!createChat) throw new HttpException(400, "Chat not created");

  return res.status(200).json({
    success: true,
    message: "User added successfully",
    data: workspace,
  });
});

const workspaceController = {
  createWorkspace,
  getWorkspaceByUserId,
  updateWorkspace,
  deleteWorkspace,
  getAllWorkspace,
  addUserInWorkspace,
};

export default workspaceController;
