"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updatefolder = exports.createfolder = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const http_exception_1 = __importDefault(require("../utils/http-exception"));
exports.createfolder = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const reqParams = req.params;
    const folderName = reqBody.name.trim().toLowerCase();
    const folderExist = yield prisma_1.default.folder.findFirst({
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
    const folderCreate = yield prisma_1.default.folder.create({
        data: { name: folderName, workspaceId: reqParams.workspaceId },
        select: {
            id: true,
            name: true,
            workspaceId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const workspaces = yield prisma_1.default.workspace.findUnique({
        where: {
            id: folderCreate.workspaceId,
        },
    });
    yield prisma_1.default.folderChat.create({
        data: {
            name: folderName,
            folderId: folderCreate.id,
            users: {
                connect: {
                    id: workspaces === null || workspaces === void 0 ? void 0 : workspaces.userId,
                },
            },
        },
    });
    return res.status(201).json({
        success: true,
        message: "folder created successfully",
        data: folderCreate,
    });
}));
const getFolderByWorkspaceId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const folder = yield prisma_1.default.folder.findMany({
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
    if (!folder)
        throw new http_exception_1.default(400, "folder not found");
    return res.status(200).json({
        success: true,
        message: "folder fetched successfully",
        data: folder,
    });
}));
const getFolderByFolderId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const files = yield prisma_1.default.folder.findUnique({
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
        const folderChat = yield prisma_1.default.folderChat.findMany({
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
    }
    catch (error) {
        res.status(400).json({
            success: false,
            message: error || "Internal server error",
        });
    }
}));
const getAllFolder = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folder = yield prisma_1.default.folder.findMany({
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
}));
exports.updatefolder = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const folderId = req.params;
    const reqBody = req.body;
    const folder = yield prisma_1.default.folder.update({
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
}));
const deletefolder = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const folder = yield prisma_1.default.folder.delete({
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
}));
const getfolderByUserId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const folderChats = yield prisma_1.default.folderChat.findFirst({
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
}));
const addUsersInFolder = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { folderId } = req.params;
    const { userList } = req.body;
    try {
        // Retrieve the folderChat using folderId
        const folderChats = yield prisma_1.default.folderChat.findFirst({
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
        const newUsers = userList.filter((user) => {
            return !folderChats.users.some((existingUser) => existingUser.id === user);
        });
        // Update the folderChat to add new users
        const updatedFolderChat = yield prisma_1.default.folderChat.update({
            where: {
                id: folderChats.id,
            },
            data: {
                users: {
                    connect: newUsers.map((userId) => ({ id: userId })),
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
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}));
const folderController = {
    createfolder: exports.createfolder,
    getFolderByFolderId,
    getFolderByWorkspaceId,
    updatefolder: exports.updatefolder,
    deletefolder,
    getAllFolder,
    addUsersInFolder,
    getfolderByUserId,
};
exports.default = folderController;
