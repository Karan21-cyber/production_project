import prisma from "../prisma";
import asyncHandler from "../utils/async-handler";
import { Request, Response } from "express";
import HttpException from "../utils/http-exception";

export const createmember = asyncHandler(
  async (req: Request, res: Response) => {

    const reqBody = req.body;
    const userId = reqBody.userId;
    const workId = req.params.workspaceId;

    const memberCreate = await prisma.members.create({
      data: { workspaceId: workId, userId: reqBody.userId },
      select: {
        id: true,
        user: {
          select: {
            id: true,
            fname: true,
            lname: true,
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

    const chats = await prisma.chat.create({
      data: {
        chatName: memberCreate?.user?.fname + " " + memberCreate?.user?.lname,
        groupAdmin: userId,
      },
    });

    if (chats) {
      console.log("chats created successfully");
    }

    return res.status(201).json({
      success: true,
      message: "member created successfully",
      data: memberCreate,
    });
  }
);

const getmemberByWorkspaceId = asyncHandler(
  async (req: Request, res: Response) => {
    const { workspaceId } = req.params;
    const member = await prisma.members.findMany({
      where: {
        workspaceId: workspaceId,
      },
      include: {
        user: {
          select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
            phone: true,
            address: true,
            image: true,
            chats: {
              select: {
                id: true,
                chatName: true,
              },
            },
            createdAt: true,
            updatedAt: true,
          },
        },
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
          fname: true,
          lname: true,
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
            fname: true,
            lname: true,
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
  const searchString = querySearch.q as string;

  if (!searchString) {
    return res.status(400).json({
      success: false,
      message: "Missing search parameter",
    });
  }

  const members = await prisma.user.findMany({
    where: {
      OR: [
        {
          fname: {
            contains: searchString,
            mode: "insensitive",
            // Make the search case-insensitive
          },
        },
        {
          lname: {
            contains: searchString,
            mode: "insensitive",
          },
        },
      ],
    },
    select: {
      id: true,
      fname: true,
      lname: true,
      address: true,
      image: true,
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
            fname: true,
            lname: true,
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
          fname: true,
          lname: true,
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
