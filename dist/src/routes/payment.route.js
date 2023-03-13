"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const payment_controller_1 = __importDefault(require("../controllers/payment.controller"));
const paymentRouter = express_1.default.Router();
paymentRouter.get('/', payment_controller_1.default.getAllPayments);
paymentRouter.get('/:id', payment_controller_1.default.getPaymentById);
paymentRouter.post('/', payment_controller_1.default.addPayment);
paymentRouter.put('/:id', payment_controller_1.default.updatePayment);
paymentRouter.delete('/:id', payment_controller_1.default.deletePayment);
exports.default = paymentRouter;
