"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userRoute_1 = __importDefault(require("./route/userRoute"));
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8000;
app.use('/user', userRoute_1.default);
app.get('/', (req, res) => {
    res.send('Hello');
});
app.listen(PORT, () => {
    console.log(`server started on ${PORT}`);
});
