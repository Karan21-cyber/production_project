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
exports.updatemember = exports.createmember = void 0;
const prisma_1 = __importDefault(require("../prisma"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const http_exception_1 = __importDefault(require("../utils/http-exception"));
exports.createmember = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const memberCreate = yield prisma_1.default.members.create({
        data: { workspaceId: reqBody.workspaceId, user: reqBody.userId },
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
        message: "member created successfully",
        data: memberCreate,
    });
}));
const getmemberByWorkspaceId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const member = yield prisma_1.default.members.findMany({
        where: {
            workspaceId: id,
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
    if (!member)
        throw new http_exception_1.default(400, "member not found");
    return res.status(200).json({
        success: true,
        message: "member fetched successfully",
        data: member,
    });
}));
const getAllmember = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const member = yield prisma_1.default.members.findMany({
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
}));
const getMemberByFolderId = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { folderId } = req.params;
    const member = yield prisma_1.default.members.findMany({
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
}));
const getMemberBySearch = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const querySearch = req.query;
    const searchString = querySearch.q;
    if (!searchString) {
        return res.status(400).json({
            success: false,
            message: "Missing search parameter",
        });
    }
    const members = yield prisma_1.default.user.findMany({
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
}));
exports.updatemember = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const memberId = req.params;
    const reqBody = req.body;
    const member = yield prisma_1.default.members.update({
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
}));
const deletemember = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const member = yield prisma_1.default.members.delete({
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
}));
const memberController = {
    createmember: exports.createmember,
    getmemberByWorkspaceId,
    getMemberBySearch,
    updatemember: exports.updatemember,
    deletemember,
    getAllmember,
    getMemberByFolderId,
};
exports.default = memberController;
