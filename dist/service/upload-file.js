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
exports.uploadImageFile = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const http_exception_1 = __importDefault(require("../utils/http-exception"));
const upload = (0, multer_1.default)({
    dest: "./uploads",
});
exports.default = upload;
const uploadImageFile = (filePath) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cloudinary_1.default.uploader.upload(filePath);
    if (!result) {
        throw new http_exception_1.default(400, "Unable to upload file.");
    }
    fs_1.default.unlinkSync(filePath);
    return result;
});
exports.uploadImageFile = uploadImageFile;
