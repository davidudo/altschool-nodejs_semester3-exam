"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const customer_controller_1 = __importDefault(require("../controllers/customer.controller"));
const customerRouter = express_1.default.Router();
customerRouter.get('/', customer_controller_1.default.getAllCustomers);
customerRouter.get('/:id', customer_controller_1.default.getCustomerById);
customerRouter.post('/', customer_controller_1.default.addCustomer);
customerRouter.put('/:id', customer_controller_1.default.updateCustomer);
customerRouter.delete('/:id', customer_controller_1.default.deleteCustomer);
exports.default = customerRouter;
