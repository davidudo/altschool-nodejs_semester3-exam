"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_config_1 = require("./src/configs/db.config");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
(0, db_config_1.dbConnection)();
const PORT = process.env.PORT;
const HOST = process.env.HOST;
const app = (0, express_1.default)();
app.get('/', (req, res) => {
    res.send('App is running...');
});
app.listen(PORT, () => {
    console.log(`Server is running at http://${HOST}:${PORT}`);
});
