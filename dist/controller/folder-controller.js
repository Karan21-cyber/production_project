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
    return res.status(201).json({
        success: true,
        message: "folder created successfully",
        data: folderCreate,
    });
}));
const getfolderByUserId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
const folderController = {
    createfolder: exports.createfolder,
    getfolderByUserId,
    updatefolder: exports.updatefolder,
    deletefolder,
    getAllFolder,
};
exports.default = folderController;
