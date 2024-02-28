"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUserSchema = exports.updateUserSchema = exports.createUserSchema = void 0;
/* eslint-disable @typescript-eslint/no-unused-vars */
const z = __importStar(require("zod"));
// Create User Schema
exports.createUserSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Name is required.' })
            .min(3, 'Minimun 3 characters is required.'),
        email: z
            .string({ required_error: 'Email is required' })
            .email('Invalid email.'),
        password: z
            .string({ required_error: 'Password is required.' })
            .refine((value) => value.length > 6, {
            message: 'Password must be at least 6 characters.'
        })
            .refine((value) => /[A-Z]/.test(value), {
            message: 'Password must contain at least one uppercase character.'
        })
            .refine((value) => /[a-z]/.test(value), {
            message: 'Password must contain at least one lowercase character.'
        })
            .refine((value) => /\d/.test(value), {
            message: 'Password must contain at least one number.'
        })
            .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: 'Password must contain at least one special character.'
        }),
        phone: z.string().nullable(),
        address: z.string().nullable()
    })
});
// update User Schema
exports.updateUserSchema = z.object({
    body: z.object({
        name: z
            .string({ required_error: 'Name is required.' })
            .min(3, 'Minimun 3 characters is required.')
    }),
    phone: z.string().nullable(),
    address: z.string().nullable()
});
// user login UserSchema
exports.loginUserSchema = z.object({
    body: z.object({
        email: z
            .string({ required_error: 'Email is required.' })
            .email('Invalid email.'),
        password: z
            .string({ required_error: 'Password is required.' })
            .refine((value) => value.length > 6, {
            message: 'Password must be at least 6 characters.'
        })
            .refine((value) => /[A-Z]/.test(value), {
            message: 'Password must contain at least one uppercase character.'
        })
            .refine((value) => /[a-z]/.test(value), {
            message: 'Password must contain at least one lowercase character.'
        })
            .refine((value) => /\d/.test(value), {
            message: 'Password must contain at least one number.'
        })
            .refine((value) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
            message: 'Password must contain at least one special character.'
        })
    })
});
