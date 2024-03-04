"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const file_controller_1 = __importDefault(require("../controller/file-controller"));
const router = (0, express_1.Router)();
router.post("/v1/files", file_controller_1.default.createfile);
router.get("/v1/files", file_controller_1.default.getAllFiles);
router.get("/v1/files/:id", file_controller_1.default.getfileByUserId);
router.put("/v1/files/:id", file_controller_1.default.updatefile);
router.delete("/v1/files/:id", file_controller_1.default.deletefile);
const filesRouter = router;
exports.default = filesRouter;
