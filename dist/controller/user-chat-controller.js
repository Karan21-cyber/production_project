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
const prisma_1 = __importDefault(require("../prisma"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const getChatsById = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const allUsers = yield prisma_1.default.chat.findMany({
        where: {
            groupAdmin: id,
        },
        select: {
            id: true,
            chatName: true,
            groupAdmin: true,
            createdAt: true,
            updatedAt: true,
            latestMessage: true,
            Messaage: true,
        },
    });
    return res.status(200).json({
        success: true,
        message: "Chats fetched successfully",
        data: allUsers,
    });
}));
const chatController = {
    getChatsById,
};
exports.default = chatController;
