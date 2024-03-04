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
exports.deleteImage = void 0;
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const get_ids_1 = require("./get-ids");
const deleteImage = (imageurl) => __awaiter(void 0, void 0, void 0, function* () {
    const public_id = (0, get_ids_1.getPublicId)(imageurl);
    const result = yield cloudinary_1.default.uploader.destroy(public_id, {
        invalidate: true,
    });
    return result;
});
exports.deleteImage = deleteImage;
