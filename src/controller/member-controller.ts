import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";
import { Request, Response } from "express";
import HttpException from "../utils/http-exception";

export const createmember = asyncHandler(
  async (req: Request, res: Response) => {
    const reqBody = req.body;

    const memberCreate = await prisma.members.create({
      data: { workspaceId: reqBody.workspaceId, user: reqBody.userId },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        workspaceId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "member created successfully",
      data: memberCreate,
    });
  }
);

const getmemberByWorkspaceId = asyncHandler(
  async (req: Request, res: Response) => {
    const { id } = req.params;
    const member = await prisma.members.findMany({
      where: {
        workspaceId: id,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        workspaceId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    if (!member) throw new HttpException(400, "member not found");

    return res.status(200).json({
      success: true,
      message: "member fetched successfully",
      data: member,
    });
  }
);

const getAllmember = asyncHandler(async (req: Request, res: Response) => {
  const member = await prisma.members.findMany({
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return res.status(200).json({
    success: true,
    message: "member fetched successfully",
    data: member,
  });
});

const getMemberByFolderId = asyncHandler(
  async (req: Request, res: Response) => {
    const { folderId } = req.params;

    const member = await prisma.members.findMany({
      where: {
        workspaceId: folderId,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        workspaceId: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    return res.status(200).json({
      success: true,
      message: "member fetched successfully",
      data: member,
    });
  }
);

const getMemberBySearch = asyncHandler(async (req: Request, res: Response) => {
  const querySearch = req.query;
  const searchString = querySearch.search as string | undefined;

  if (!searchString) {
    return res.status(400).json({
      success: false,
      message: "Missing search parameter",
    });
  }

  const members = await prisma.members.findMany({
    where: {
      user: {
        name: {
          contains: searchString,
        },
      },
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    success: true,
    message: "Members fetched successfully",
    data: members,
  });
});

export const updatemember = asyncHandler(
  async (req: Request, res: Response) => {
    const memberId = req.params;
    const reqBody = req.body;

    const member = await prisma.members.update({
      where: {
        id: memberId.id,
      },
      data: {
        user: reqBody.userId,
      },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            phone: true,
            address: true,
            image: true,
            createdAt: true,
            updatedAt: true,
          },
        },
        workspaceId: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return res.status(201).json({
      success: true,
      message: "member updated successfully",
      data: member,
    });
  }
);

const deletemember = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const member = await prisma.members.delete({
    where: {
      id,
    },
    select: {
      id: true,
      user: {
        select: {
          id: true,
          name: true,
          email: true,
          phone: true,
          address: true,
          image: true,
          createdAt: true,
          updatedAt: true,
        },
      },
      workspaceId: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  return res.status(200).json({
    success: true,
    message: "member fetched successfully",
    data: member,
  });
});

const memberController = {
  createmember,
  getmemberByWorkspaceId,
  getMemberBySearch,
  updatemember,
  deletemember,
  getAllmember,
  getMemberByFolderId,
};

export default memberController;
