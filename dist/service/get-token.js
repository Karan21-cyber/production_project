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
exports.isRefereshTokenExpired = exports.getRefreshToken = exports.getAccessToken = exports.getAccessTokenAndRefereshToken = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma_1 = __importDefault(require("../prisma"));
const getAccessTokenAndRefereshToken = (userId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const accessToken = (0, exports.getAccessToken)(userId);
        const refreshToken = (0, exports.getRefreshToken)(userId);
        yield prisma_1.default.user.update({
            where: {
                id: userId,
            },
            data: {
                refreshToken,
            },
        });
        return {
            accessToken,
            refreshToken,
        };
    }
    catch (err) {
        console.log(err);
    }
});
exports.getAccessTokenAndRefereshToken = getAccessTokenAndRefereshToken;
const getAccessToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ data: userId, iat: Date.now() }, process.env.ACCESS_TOKEN_KEY, {
        expiresIn: "1h",
    });
    return token;
};
exports.getAccessToken = getAccessToken;
const getRefreshToken = (userId) => {
    const token = jsonwebtoken_1.default.sign({ data: userId, iat: Date.now() }, process.env.REFRESH_TOKEN_KEY, {
        expiresIn: "10d",
    });
    return token;
};
exports.getRefreshToken = getRefreshToken;
const isRefereshTokenExpired = (refreshToken) => {
    try {
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.SECRET_TOKEN_KEY);
        return decoded;
    }
    catch (err) {
        return false;
    }
};
exports.isRefereshTokenExpired = isRefereshTokenExpired;
