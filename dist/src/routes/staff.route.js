"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const staff_controller_1 = __importDefault(require("../controllers/staff.controller"));
const staffRouter = express_1.default.Router();
staffRouter.get('/', staff_controller_1.default.getAllStaffs);
staffRouter.get('/:id', staff_controller_1.default.getStaffById);
staffRouter.post('/', staff_controller_1.default.addStaff);
staffRouter.put('/:id', staff_controller_1.default.updateStaff);
staffRouter.delete('/:id', staff_controller_1.default.deleteStaff);
exports.default = staffRouter;
