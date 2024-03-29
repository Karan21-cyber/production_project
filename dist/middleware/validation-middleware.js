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
Object.defineProperty(exports, "__esModule", { value: true });
const validationMiddleware = (schema) => {
    return (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        try {
            schema.parse({
                body: req.body,
                params: req.params,
                query: req.query
            });
            next();
        }
        catch (error) {
            const validationError = {
                success: false,
                message: ((_a = error.issues[0]) === null || _a === void 0 ? void 0 : _a.message) || 'Validation failed',
                issues: error
            };
            return res.status(400).json(validationError);
        }
    });
};
exports.default = validationMiddleware;
