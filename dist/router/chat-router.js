"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_chat_controller_1 = __importDefault(require("../controller/user-chat-controller"));
const router = (0, express_1.Router)();
router.get("/spaceworld/v1/chats/:id", user_chat_controller_1.default.getChatsById);
const chatRouter = router;
exports.default = chatRouter;
