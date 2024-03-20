"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workspace_controller_1 = __importDefault(require("../controller/workspace-controller"));
const router = (0, express_1.Router)();
router.post("/spaceworld/v1/workspace/:userId", workspace_controller_1.default.createWorkspace);
router.post("/spaceworld/v1/workspace/addUser/:workspaceId", workspace_controller_1.default.addUserInWorkspace);
router.get("/spaceworld/v1/workspace", workspace_controller_1.default.getAllWorkspace);
router.get("/spaceworld/v1/workspace/:id", workspace_controller_1.default.getWorkspaceByUserId);
router.put("/spaceworld/v1/workspace/:id", workspace_controller_1.default.updateWorkspace);
router.delete("/spaceworld/v1/workspace/:id", workspace_controller_1.default.deleteWorkspace);
const workspaceRouter = router;
exports.default = workspaceRouter;
