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
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const db_1 = __importDefault(require("../db/db"));
const validation_1 = require("../validation");
dotenv_1.default.config();
const router = (0, express_1.default)();
router.use(express_1.default.json());
router.post('/signup', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = validation_1.userSignup.safeParse(req.body);
    const user = body === null || body === void 0 ? void 0 : body.data;
    const userExist = yield db_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
    });
    if (userExist) {
        return res.json({
            msg: 'User already exists',
        });
    }
    yield db_1.default.user.create({
        data: {
            name: user.name,
            email: user.email,
            password: user.password,
        },
    });
    res.status(201).json({
        status: true,
        msg: 'User created successfully',
    });
}));
router.post('/signin', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const body = validation_1.userSignin.safeParse(req.body);
    }
    catch (error) {
        return res.json({ status: false, error: error });
    }
    const user = req.body;
    const secret = process.env.SECRET_KEY || 'default_secret';
    const userExist = yield db_1.default.user.findUnique({
        where: {
            email: user === null || user === void 0 ? void 0 : user.email,
        },
        select: {
            id: true,
            email: true,
        },
    });
    if (!userExist) {
        return res.status(400).json({
            msg: 'User does not exist',
        });
    }
    const token = jsonwebtoken_1.default.sign({ id: userExist === null || userExist === void 0 ? void 0 : userExist.id, email: userExist === null || userExist === void 0 ? void 0 : userExist.email }, secret, {
        expiresIn: '7d',
    });
    res.status(200).json({
        status: true,
        msg: 'Signin successful',
        token,
    });
}));
exports.default = router;
