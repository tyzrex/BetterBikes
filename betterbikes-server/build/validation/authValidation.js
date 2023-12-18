"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerSchema = exports.loginSchema = void 0;
const zod_1 = require("zod");
exports.loginSchema = zod_1.z.object({
    email: zod_1.z.string({
        required_error: "Email is required",
        invalid_type_error: "Invalid Email",
    }),
    password: zod_1.z
        .string({
        required_error: "Password is required",
        invalid_type_error: "Invalid Password",
    })
        .min(6, "Password must be atleast 6 characters")
        .max(100),
});
const phoneRegex = new RegExp(/^([+]?[\s0-9]+)?(\d{3}|[(]?[0-9]+[)])?([-]?[\s]?[0-9])+$/);
exports.registerSchema = zod_1.z
    .object({
    fullName: zod_1.z
        .string({
        required_error: "Name cannot be empty",
        invalid_type_error: "Invalid Name",
    })
        .min(1)
        .max(30),
    email: zod_1.z
        .string({
        required_error: "Email cannopt be empty",
        invalid_type_error: "Invalid Email",
    })
        .email(),
    password: zod_1.z
        .string({
        required_error: "Password cannot be empty",
        invalid_type_error: "Invalid Password",
    })
        .min(6, "Password must be atleast 6 characters")
        .max(100),
    confirmPassword: zod_1.z
        .string({
        required_error: "Confirm Password cannot be empty",
        invalid_type_error: "Invalid Confirm Password",
    })
        .min(6, "Password must be atleast 6 characters")
        .max(100),
    phone: zod_1.z
        .string({
        required_error: "Phone cannot be empty",
        invalid_type_error: "Invalid Phone",
    })
        .regex(phoneRegex, "Invalid Phone Number!"),
    address: zod_1.z
        .string({
        required_error: "Address Field Required",
        invalid_type_error: "Invalid Address",
    })
        .min(3, "Minimum 3 characters"),
})
    .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords must match",
    path: ["confirmPassword"],
});
