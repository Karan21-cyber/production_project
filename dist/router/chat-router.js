"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const chat_controller_1 = __importDefault(require("../controller/chat-controller"));
const router = (0, express_1.Router)();
router.post("/spaceworld/v1/chats/:folderId", chat_controller_1.default.createChat);
// router.get("/spaceworld/v1/chats", chatController.getAllchats);
router.get("/spaceworld/v1/chats/:id", chat_controller_1.default.getChatById);
// router.put("/spaceworld/v1/chats/:id", chatController.updatechats);
// router.delete("/spaceworld/v1/chats/:id", chatController.deletechats);
const chatssRouter = router;
exports.default = chatssRouter;
