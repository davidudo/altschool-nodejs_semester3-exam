"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const authRouter = express_1.default.Router();
authRouter.get('/', auth_controller_1.default.getAllAuths);
authRouter.get('/:id', auth_controller_1.default.getAuthById);
authRouter.post('/', auth_controller_1.default.addAuth);
authRouter.put('/:id', auth_controller_1.default.updateAuth);
authRouter.delete('/:id', auth_controller_1.default.deleteAuth);
exports.default = authRouter;
