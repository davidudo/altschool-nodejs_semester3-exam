"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const menu_item_controller_1 = __importDefault(require("../controllers/menu_item.controller"));
const menuItemRouter = express_1.default.Router();
menuItemRouter.get('/', menu_item_controller_1.default.getAllMenuItems);
menuItemRouter.get('/:id', menu_item_controller_1.default.getMenuItemById);
menuItemRouter.post('/', menu_item_controller_1.default.addMenuItem);
menuItemRouter.put('/:id', menu_item_controller_1.default.updateMenuItem);
menuItemRouter.delete('/:id', menu_item_controller_1.default.deleteMenuItem);
exports.default = menuItemRouter;
