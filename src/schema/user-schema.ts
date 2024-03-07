/* eslint-disable @typescript-eslint/no-unused-vars */
import * as z from "zod";

// Create User Schema
export const createUserSchema = z.object({
  body: z.object({
    fname: z
      .string({ required_error: "First Name is required." })
      .min(3, "Minimun 3 characters is required."),
    lname: z
      .string({ required_error: "Last Name is required." })
      .min(3, "Minimun 3 characters is required."),

    email: z
      .string({ required_error: "Email is required" })
      .email("Invalid email."),
    password: z
      .string({ required_error: "Password is required." })
      .refine((value: string) => value.length > 6, {
        message: "Password must be at least 6 characters.",
      })
      .refine((value: string) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase character.",
      })
      .refine((value: string) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase character.",
      })
      .refine((value: string) => /\d/.test(value), {
        message: "Password must contain at least one number.",
      })
      .refine((value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character.",
      }),
    phone: z.string().nullable(),
    address: z.string().nullable(),
    gender: z.string().nullable(),
  }),
});

// update User Schema
export const updateUserSchema = z.object({
  body: z.object({
    name: z
      .string({ required_error: "Name is required." })
      .min(3, "Minimun 3 characters is required."),
  }),
  phone: z.string().nullable(),
  address: z.string().nullable(),
});

// user login UserSchema
export const loginUserSchema = z.object({
  body: z.object({
    email: z
      .string({ required_error: "Email is required." })
      .email("Invalid email."),
    password: z
      .string({ required_error: "Password is required." })
      .refine((value: string) => value.length > 6, {
        message: "Password must be at least 6 characters.",
      })
      .refine((value: string) => /[A-Z]/.test(value), {
        message: "Password must contain at least one uppercase character.",
      })
      .refine((value: string) => /[a-z]/.test(value), {
        message: "Password must contain at least one lowercase character.",
      })
      .refine((value: string) => /\d/.test(value), {
        message: "Password must contain at least one number.",
      })
      .refine((value: string) => /[!@#$%^&*(),.?":{}|<>]/.test(value), {
        message: "Password must contain at least one special character.",
      }),
  }),
});
