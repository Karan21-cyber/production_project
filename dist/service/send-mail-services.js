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
const http_exception_1 = __importDefault(require("../utils/http-exception"));
const mail_template_1 = require("../utils/mail-template");
const nodemailer_1 = __importDefault(require("nodemailer"));
const sendMailVerification = ({ email, name, id, }) => __awaiter(void 0, void 0, void 0, function* () {
    const transporter = nodemailer_1.default.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: false,
        service: "gmail",
        auth: {
            user: process.env.USER_MAIL,
            pass: process.env.PASSWORD_MAIL,
        },
    });
    const mailsend = yield transporter.sendMail({
        from: process.env.USER_MAIL,
        to: `${email}`,
        subject: "Vericification Mail From Space world",
        text: `Hello ${name},\n\nThis is verification mail.`,
        html: (0, mail_template_1.mail_template)({ name, id }),
    });
    if (!mailsend)
        throw new http_exception_1.default(500, "Error sending mail");
    return mailsend;
});
exports.default = sendMailVerification;
