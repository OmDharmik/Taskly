"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.userSignup = exports.userSignin = exports.createTodo = void 0;
const zod_1 = require("zod");
const userSignup = zod_1.z.object({
    name: zod_1.z.string(),
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.userSignup = userSignup;
const userSignin = zod_1.z.object({
    email: zod_1.z.string().email(),
    password: zod_1.z.string().min(6),
});
exports.userSignin = userSignin;
const createTodo = zod_1.z.object({
    title: zod_1.z.string(),
    description: zod_1.z.string().optional(),
});
exports.createTodo = createTodo;
