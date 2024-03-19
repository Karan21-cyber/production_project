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
exports.updatefile = exports.createfile = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const http_exception_1 = __importDefault(require("../utils/http-exception"));
exports.createfile = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const reqParams = req.params;
    const fileName = reqBody.name.trim().toLowerCase();
    const fileExist = yield prisma_1.default.file.findFirst({
        where: {
            folderId: reqParams.folderId,
            name: fileName,
        },
    });
    if (fileExist) {
        return res.status(201).json({
            success: false,
            message: "File already exist",
        });
    }
    const fileCreate = yield prisma_1.default.file.create({
        data: { name: fileName, folderId: reqParams.folderId },
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
}));
const getfileByUserId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const file = yield prisma_1.default.file.findMany({
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
    if (!file)
        throw new http_exception_1.default(400, "file not found");
    return res.status(200).json({
        success: true,
        message: "file fetched successfully",
        data: file,
    });
}));
exports.updatefile = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const fileId = req.params;
    const reqBody = req.body;
    const file = yield prisma_1.default.file.update({
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
}));
const getAllFiles = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const files = yield prisma_1.default.file.findMany({
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
}));
const deletefile = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const file = yield prisma_1.default.file.delete({
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
}));
const fileController = {
    createfile: exports.createfile,
    getfileByUserId,
    updatefile: exports.updatefile,
    deletefile,
    getAllFiles,
};
exports.default = fileController;
