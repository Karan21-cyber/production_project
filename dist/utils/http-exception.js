"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class HttpException extends Error {
    constructor(status, message) {
        super(message);
        this.message = message;
        this.statusCode = status;
    }
}
exports.default = HttpException;
