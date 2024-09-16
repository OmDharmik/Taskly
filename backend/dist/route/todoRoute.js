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
const db_1 = __importDefault(require("../db/db"));
const middleware_1 = __importDefault(require("../middleware"));
const validation_1 = require("../validation");
dotenv_1.default.config();
const router = (0, express_1.default)();
router.use(express_1.default.json());
//create Todo
router.post('/create', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const body = validation_1.createTodo.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ status: false, errors: body.error.errors });
    }
    const data = body.data;
    try {
        if (!req.user) {
            return res.status(401).json({ message: 'User not authenticated.' });
        }
        const response = yield db_1.default.todo.create({
            data: {
                title: data.title,
                description: data.description || '',
                completed: false,
                userId: req.user.id,
            },
        });
        return res.status(200).json({
            status: true,
            msg: 'Added successfully',
            todo: response,
        });
    }
    catch (error) {
        console.error('Error creating todo:', error);
        res.status(500).json({ status: false, message: 'Internal Server Error' });
    }
}));
//read all Todo
router.get('/', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user) {
        return res.send('User not logged in');
    }
    const user = req === null || req === void 0 ? void 0 : req.user;
    const todo = yield db_1.default.todo.findMany({
        where: {
            userId: user.id,
        },
    });
    res.status(200).json({
        status: true,
        msg: 'fetched data successfully',
        data: todo,
    });
}));
//update Todo
router.put('/:id', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    const body = validation_1.createTodo.safeParse(req.body);
    if (!body.success) {
        return res.status(400).json({ status: false, errors: body.error.errors });
    }
    const data = body.data;
    try {
        const todo = yield db_1.default.todo.update({
            where: {
                id: id,
            },
            data: {
                title: data.title,
                description: data.description,
            },
        });
        res.status(200).json({
            status: true,
            msg: 'Updated successfully',
            data: todo,
        });
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            msg: 'failed to update',
        });
    }
}));
//delete Todo
router.delete('/:id', middleware_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = Number(req.params.id);
    try {
        yield db_1.default.todo.delete({
            where: {
                id: id,
            },
        });
        res.status(200).json({
            status: true,
            msg: 'Record deleted successfuly',
        });
    }
    catch (error) {
        return res.status(400).json({
            status: false,
            msg: 'record does not exist',
        });
    }
}));
exports.default = router;
