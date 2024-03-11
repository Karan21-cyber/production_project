"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.statusCode = status;
        this.message = message;
    }
}
exports.default = HttpException;
