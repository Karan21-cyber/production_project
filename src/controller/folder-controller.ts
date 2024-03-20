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

    const workspaces = await prisma.workspace.findUnique({
      where: {
        id: folderCreate.workspaceId,
      },
    });

    await prisma.folderChat.create({
      data: {
        name: folderName,
        folderId: folderCreate.id,
        users: {
          connect: {
            id: workspaces?.userId,
          },
        },
      },
    });

    return res.status(201).json({
      success: true,
      message: "folder created successfully",
      data: folderCreate,
    });
  }
);

const getFolderByWorkspaceId = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

const getFolderByFolderId = asyncHandler(
  async (req: Request, res: Response) => {
    try {
      const { id } = req.params;

      const files = await prisma.folder.findUnique({
        where: {
          id: id,
        },
        select: {
          files: {
            select: {
              id: true,
              name: true,
              folderId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
        },
      });

      const folderChat = await prisma.folderChat.findMany({
        where: {
          folderId: id,
        },
        select: {
          id: true,
          name: true,
          folder: {
            select: {
              id: true,
              name: true,
              workspaceId: true,
              createdAt: true,
              updatedAt: true,
            },
          },
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
          },
          createdAt: true,
          updatedAt: true,
        },
      });

      if (!folderChat) {
        return res.status(404).json({
          success: false,
          message: "Folder not found",
        });
      }

      res.status(200).json({
        success: true,
        message: "Folder fetched successfully",
        data: { folderChat, files },
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error || "Internal server error",
      });
    }
  }
);

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

const getfolderByUserId = asyncHandler(async (req: Request, res: Response) => {
  const { id } = req.params;

  const folderChats = await prisma.folderChat.findFirst({
    where: {
      users: {
        some: {
          id: id,
        },
      },
    },
    include: {
      folder: {
        select: {
          id: true,
          name: true,
          workspaceId: true,
          createdAt: true,
          updatedAt: true,
        },
      },
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
      },
    },
  });

  if (!folderChats) {
    return res.status(404).json({
      success: false,
      message: "Folder not found",
    });
  }

  return res.status(200).json({
    success: true,
    message: "Folder fetched successfully",
    data: folderChats,
  });
});

const addUsersInFolder = asyncHandler(async (req: Request, res: Response) => {
  const { folderId } = req.params;
  const { userList } = req.body;

  try {
    // Retrieve the folderChat using folderId
    const folderChats = await prisma.folderChat.findFirst({
      where: {
        folderId: folderId,
      },
      include: {
        users: true, // Include existing users for the folderChat
      },
    });

    if (!folderChats) {
      return res.status(404).json({
        success: false,
        message: "Folder chat not found",
      });
    }

    // Filter out any users already added to the folderChat
    const newUsers = userList.filter((user: string) => {
      return !folderChats.users.some(
        (existingUser) => existingUser.id === user
      );
    });

    // Update the folderChat to add new users
    const updatedFolderChat = await prisma.folderChat.update({
      where: {
        id: folderChats.id,
      },
      data: {
        users: {
          connect: newUsers.map((userId: string) => ({ id: userId })),
        },
      },
      include: {
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
        }, // Include updated users for the folderChat
      },
    });

    return res.status(201).json({
      success: true,
      message: "Users added to folder chat successfully",
      data: updatedFolderChat,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
});

const folderController = {
  createfolder,
  getFolderByFolderId,
  getFolderByWorkspaceId,
  updatefolder,
  deletefolder,
  getAllFolder,
  addUsersInFolder,
  getfolderByUserId,
};

export default folderController;
