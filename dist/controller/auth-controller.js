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
const bcrypt_1 = __importDefault(require("bcrypt"));
const prisma_1 = __importDefault(require("../prisma"));
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const get_token_1 = require("../service/get-token");
const http_exception_1 = __importDefault(require("../utils/http-exception"));
const user_services_1 = require("../service/user-services");
const userLogin = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const reqBody = req.body;
    const email = reqBody === null || reqBody === void 0 ? void 0 : reqBody.email.trim().toLowerCase();
    const user = yield (0, user_services_1.getUserByEmail)(email);
    // if (!user) throw new HttpException(400, "User not found");
    if (!user) {
        return res
            .status(400)
            .json({ success: false, message: "User not found" });
    }
    const comparePassword = yield bcrypt_1.default.compare(reqBody === null || reqBody === void 0 ? void 0 : reqBody.password, user === null || user === void 0 ? void 0 : user.password);
    // if (!comparePassword) throw new HttpException(400, "Invalid credentials");
    if (!comparePassword) {
        return res
            .status(400)
            .json({ success: false, message: "Invalid credentials" });
    }
    if ((user === null || user === void 0 ? void 0 : user.verified) === "unverified" ||
        (user === null || user === void 0 ? void 0 : user.verified) === "pending" ||
        (user === null || user === void 0 ? void 0 : user.verified) === undefined) {
        return res
            .status(400)
            .json({ success: false, message: "User is not Verified." });
    }
    // if (user?.verified === "unverified") {
    //   return res
    //     .status(400)
    //     .json({ success: false, message: "User is not Verified." });
    // }
    const workspace = yield prisma_1.default.workspace.findMany({
        where: {
            userId: user === null || user === void 0 ? void 0 : user.id,
        },
        select: {
            id: true,
            name: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    const token = yield (0, get_token_1.getAccessTokenAndRefereshToken)(user === null || user === void 0 ? void 0 : user.id);
    const options = {
        httpOnly: true,
        secure: true,
    };
    return res
        .status(200)
        .cookie("accessToken", token === null || token === void 0 ? void 0 : token.accessToken, options)
        .cookie("refreshToken", token === null || token === void 0 ? void 0 : token.refreshToken, options)
        .json({
        success: true,
        message: "User logged in successfully",
        data: {
            id: user === null || user === void 0 ? void 0 : user.id,
            token: token === null || token === void 0 ? void 0 : token.accessToken,
            refreshToken: token === null || token === void 0 ? void 0 : token.refreshToken,
            createdAt: user === null || user === void 0 ? void 0 : user.createdAt,
            updatedAt: user === null || user === void 0 ? void 0 : user.updatedAt,
        },
        workspace: workspace,
    });
}));
const userLogOut = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const user = yield prisma_1.default.user.findUnique({
        where: {
            id,
        },
    });
    if (!user)
        throw new http_exception_1.default(400, "User not found");
    yield prisma_1.default.user.update({
        where: {
            id: user === null || user === void 0 ? void 0 : user.id,
        },
        data: {
            refreshToken: null || undefined || "",
        },
    });
    const options = { httpOnly: true, secure: true };
    return res
        .status(200)
        .cookie("refreshToken", null, options)
        .cookie("accessToken", null, options)
        .json({
        success: true,
        message: "User logged out successfully",
    });
}));
const refreshLogin = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { refreshToken } = req.query;
    if (typeof refreshToken !== "string") {
        throw new http_exception_1.default(400, "Invalid refresh token");
    }
    const user = yield prisma_1.default.user.findFirst({
        where: {
            refreshToken,
        },
    });
    if (!user) {
        throw new http_exception_1.default(400, "User not found");
    }
    const isExpired = (0, get_token_1.isRefereshTokenExpired)((_a = user === null || user === void 0 ? void 0 : user.refreshToken) !== null && _a !== void 0 ? _a : "");
    if (isExpired) {
        yield prisma_1.default.user.update({
            where: {
                id: user.id,
            },
            data: {
                refreshToken: null, // Assuming you want to set it to null if expired
            },
        });
        const options = { httpOnly: true, secure: true };
        return res
            .status(401)
            .cookie("refreshToken", null, options)
            .cookie("accessToken", null, options)
            .json({
            success: false,
            message: "Refresh token expired. Please login again.",
        });
    }
    else {
        const accessToken = (0, get_token_1.getAccessToken)(user.id);
        const options = { httpOnly: true, secure: true };
        return res.cookie("accessToken", accessToken, options).status(200).json({
            success: true,
            data: {
                accessToken,
            },
        });
    }
}));
const userVerification = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const findUser = yield prisma_1.default.user.findUnique({
        where: {
            id: id,
        },
    });
    if (!findUser) {
        return res.status(400).json({
            success: false,
            message: "User not found",
        });
    }
    const user = yield prisma_1.default.user.update({
        where: {
            id: id,
        },
        data: {
            verified: "verified",
        },
        select: {
            id: true,
            fname: true,
            lname: true,
            email: true,
            phone: true,
            verified: true,
            address: true,
            image: true,
            createdAt: true,
            updatedAt: true,
        },
    });
    return res.status(200).json({
        success: true,
        message: "User verified successfully",
        data: user,
    });
}));
const authController = {
    userLogin,
    userLogOut,
    refreshLogin,
    userVerification,
};
exports.default = authController;
