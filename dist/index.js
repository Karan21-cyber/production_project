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
const http_1 = __importDefault(require("http")); // Import the http module
const prisma_1 = __importDefault(require("./prisma"));
const error_middleware_1 = __importDefault(require("./middleware/error-middleware"));
const auth_router_1 = __importDefault(require("./router/auth-router"));
const payment_sevices_1 = __importDefault(require("./service/payment-sevices"));
const user_router_1 = __importDefault(require("./router/user-router"));
const workspace_router_1 = __importDefault(require("./router/workspace-router"));
const folder_router_1 = __importDefault(require("./router/folder-router"));
const files_router_1 = __importDefault(require("./router/files-router"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const chat_router_1 = __importDefault(require("./router/chat-router"));
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
const io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:4550",
        methods: ["GET", "POST"],
    },
});
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.get("/", (req, res) => {
    res.json({
        success: true,
        Status_Code: 200,
        message: "Welcome to Production Project Server...",
    });
});
app.use(auth_router_1.default, user_router_1.default, workspace_router_1.default, folder_router_1.default, files_router_1.default, chat_router_1.default);
app.use(error_middleware_1.default);
(0, payment_sevices_1.default)();
// Connection event with authenticated sockets
io.on("connection", (socket) => {
    console.log("User Connected to (Server).");
    //Emit a "message" event to the client
    // socket.on("message", (message) => {
    //   console.log("Received From client: ", message);
    //   io.emit("message", message);
    // });
    // Your existing chat and disconnect event handlers
    // socket.on("chat", (args1) => {
    //   console.log("From server: ", args1);
    //   console.log("Received From client: ", args1);
    //   io.emit("chat", args1);
    // io.emit("chat", );
    // });
    // Emit a "setup" event to the client
    socket.on("setup", (user) => {
        socket.join(user._id);
        socket.emit("connected");
    });
    socket.on("join chat", (room) => {
        socket.join(room);
        console.log("User Joined Room: " + room);
    });
    socket.on("typing", (room) => socket.in(room).emit("typing"));
    socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));
    socket.on("new message", (newMessageReceived) => {
        const chat = newMessageReceived.chat;
        if (!chat.users) {
            console.log("chat.users not defined");
            return;
        }
        chat.user.forEach((user) => {
            if (user._id === newMessageReceived.sender._id) {
                return;
            }
            socket.in(user._id).emit("message received", newMessageReceived);
        });
    });
    socket.on("disconnect", function () {
        console.log("user disconnected from (server)");
    });
});
const PORT = 5500;
prisma_1.default
    .$connect()
    .then(() => {
    server.listen(PORT, () => {
        console.log(`Server started on port ${PORT}`);
        console.log("socket is also running...");
    });
})
    .catch((e) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(e.message);
}));
