"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
require("colors");
const todos_1 = __importDefault(require("./routes/todos"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use('/todos', todos_1.default);
app.use((err, req, res, next) => {
    res.status(500);
    res.json({ message: err.message });
});
app.use((_, res) => {
    res.status(500);
    res.json({ message: 'all routes' });
});
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`.cyan.underline.bold);
});
