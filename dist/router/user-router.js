"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const user_controller_1 = __importDefault(require("../controller/user-controller"));
const validation_middleware_1 = __importDefault(require("../middleware/validation-middleware"));
const user_schema_1 = require("../schema/user-schema");
const router = (0, express_1.Router)();
router.post("/v1/user", (0, validation_middleware_1.default)(user_schema_1.createUserSchema), user_controller_1.default.createUser);
router.get("/v1/user", user_controller_1.default.getAllUser);
router.get("/v1/user/:id", user_controller_1.default.getUserById);
router.put("/v1/user/:id", user_controller_1.default.updateUser);
router.delete("/v1/user/:id", user_controller_1.default.deleteUser);
router.post("/v1/sendmail", user_controller_1.default.sendNodemailer);
const userRouter = router;
exports.default = userRouter;
