"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspace_controller_1 = __importDefault(require("../controller/workspace-controller"));
const router = (0, express_1.Router)();
router.post("/v1/workspace", workspace_controller_1.default.createWorkspace);
router.get("/v1/workspace", workspace_controller_1.default.getAllWorkspace);
router.get("/v1/workspace/:id", workspace_controller_1.default.getWorkspaceByUserId);
router.put("/v1/workspace/:id", workspace_controller_1.default.updateWorkspace);
router.delete("/v1/workspace/:id", workspace_controller_1.default.deleteWorkspace);
const workspaceRouter = router;
exports.default = workspaceRouter;
