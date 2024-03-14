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
exports.updateWorkspace = exports.createWorkspace = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const http_exception_1 = __importDefault(require("../utils/http-exception"));
exports.createWorkspace = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const reqParams = req.params;
    const workspace = reqBody.name.trim().toLowerCase();
    const workspaceCreate = yield prisma_1.default.workspace.create({
        data: { name: workspace, userId: reqParams.userId },
        select: {
            id: true,
            name: true,
            userId: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const member = yield prisma_1.default.members.create({
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
}));
const getWorkspaceByUserId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const workspace = yield prisma_1.default.workspace.findMany({
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
    if (!workspace)
        throw new http_exception_1.default(400, "Workspace not found");
    return res.status(200).json({
        success: true,
        message: "Workspace fetched successfully",
        data: workspace,
    });
}));
exports.updateWorkspace = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const reqBody = req.body;
    const workspace = yield prisma_1.default.workspace.update({
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
}));
const getAllWorkspace = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const workspace = yield prisma_1.default.workspace.findMany({
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
}));
const deleteWorkspace = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const workspace = yield prisma_1.default.workspace.delete({
        where: {
            id,
        },
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
}));
const workspaceController = {
    createWorkspace: exports.createWorkspace,
    getWorkspaceByUserId,
    updateWorkspace: exports.updateWorkspace,
    deleteWorkspace,
    getAllWorkspace,
};
exports.default = workspaceController;
