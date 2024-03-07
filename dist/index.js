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
const express_1 = __importDefault(require("express"));
const prisma_1 = __importDefault(require("./prisma"));
const error_middleware_1 = __importDefault(require("./middleware/error-middleware"));
const auth_router_1 = __importDefault(require("./router/auth-router"));
const payment_sevices_1 = __importDefault(require("./service/payment-sevices"));
const user_router_1 = __importDefault(require("./router/user-router"));
const workspace_router_1 = __importDefault(require("./router/workspace-router"));
const folder_router_1 = __importDefault(require("./router/folder-router"));
const files_router_1 = __importDefault(require("./router/files-router"));
const member_router_1 = __importDefault(require("./router/member-router"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        success: true,
        Status_Code: 200,
        message: "Welcome to Production Project Server...",
    });
});
app.use(auth_router_1.default, user_router_1.default, workspace_router_1.default, folder_router_1.default, files_router_1.default, member_router_1.default);
app.use(error_middleware_1.default);
(0, payment_sevices_1.default)();
prisma_1.default
    .$connect()
    .then(() => {
    app.listen(5500, () => {
        console.log("Server started on port 5500");
    });
})
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(e.message);
}));
