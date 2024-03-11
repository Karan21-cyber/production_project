"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const member_controller_1 = __importDefault(require("../controller/member-controller"));
const router = (0, express_1.Router)();
router.post("/spaceworld/v1/members/:workspaceId", member_controller_1.default.createmember);
router.get("/spaceworld/v1/members", member_controller_1.default.getAllmember);
router.get("/spaceworld/v1/members/:workspaceId", member_controller_1.default.getmemberByWorkspaceId);
router.post("/spaceworld/v1/members", member_controller_1.default.getMemberBySearch);
router.put("/spaceworld/v1/members/:id", member_controller_1.default.updatemember);
router.delete("/spaceworld/v1/members/:id", member_controller_1.default.deletemember);
router.get("/spaceworld/v1/members/:folderId", member_controller_1.default.getMemberByFolderId);
const membersRouter = router;
exports.default = membersRouter;
