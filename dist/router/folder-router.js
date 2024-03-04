"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const folder_controller_1 = __importDefault(require("../controller/folder-controller"));
const router = (0, express_1.Router)();
router.post("/spaceworld/v1/files", folder_controller_1.default.createfolder);
router.get("/spaceworld/v1/files", folder_controller_1.default.getAllFolder);
router.get("/spaceworld/v1/folders/:id", folder_controller_1.default.getfolderByUserId);
router.put("/spaceworld/v1/folders/:id", folder_controller_1.default.updatefolder);
router.delete("/spaceworld/v1/folders/:id", folder_controller_1.default.deletefolder);
const foldersRouter = router;
exports.default = foldersRouter;
