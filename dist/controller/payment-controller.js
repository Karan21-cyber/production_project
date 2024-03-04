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
exports.getPusblishedKey = void 0;
const async_handler_1 = __importDefault(require("../utils/async-handler"));
const publishableKey = process.env.STRIPE_PUBLISHED_KEY;
exports.getPusblishedKey = (0, async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(publishableKey);
        res.status(200).json({
            success: true,
            message: "Get your publishable key",
            data: publishableKey,
        });
    }
    catch (error) {
        console.log(error);
    }
}));
