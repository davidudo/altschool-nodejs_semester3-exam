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
const stripe_1 = __importDefault(require("stripe"));
const stripe_config_ts_1 = require("./configs/stripe.config.ts");
const payment_model_1 = require("../models/payment.model");
function getAllPayments(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const payments = yield payment_model_1.PaymentModel.findAll({
                where: { deletedAt: null }
            });
            return res.status(200).json({
                status: true,
                payments
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getPaymentById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const paymentId = Number(req.params.id);
            const payment = yield payment_model_1.PaymentModel.findOne({
                where: { id: paymentId, deletedAt: null }
            });
            if (payment == null) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            return res.status(200).json({
                status: true,
                payment
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function addPayment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { orderId, amount, paymentGateway } = req.body;
            const stripe = new stripe_1.default(stripe_config_ts_1.stripeConfig.apiKey);
            const charge = yield stripe.charges.create({
                amount,
                currency: 'usd',
                description: 'Example charge',
                source: 'tok_visa', // replace with an actual token obtained from Stripe.js or Elements
            });
            const payment = yield payment_model_1.PaymentModel.create({
                orderId,
                amount,
                paymentGateway
            });
            return res.status(200).json({
                status: true,
                payment,
                charge
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updatePayment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const paymentId = Number(req.params.id);
            const { orderId, amount, paymentGateway } = req.body;
            const payment = yield payment_model_1.PaymentModel.findOne({ where: { id: paymentId, deletedAt: null } });
            if (payment == null) {
                return res.status(404).send(`Customer with id ${paymentId} not found`);
            }
            payment.orderId = orderId !== null && orderId !== void 0 ? orderId : payment.orderId;
            payment.amount = amount !== null && amount !== void 0 ? amount : payment.amount;
            payment.paymentGateway = paymentGateway !== null && paymentGateway !== void 0 ? paymentGateway : payment.paymentGateway;
            yield payment.save();
            return res.status(200).json({
                status: true,
                payment
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deletePayment(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const paymentId = Number(req.params.id);
            const payment = yield payment_model_1.PaymentModel.findOne({
                where: { id: paymentId, deletedAt: null }
            });
            if (payment == null) {
                return res.status(404).json({ message: 'Payment not found' });
            }
            else {
                payment.deletedAt = new Date();
                yield payment.save();
                return res.status(200).json({
                    status: true,
                    message: 'Payment deleted successfully'
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getAllPayments,
    getPaymentById,
    addPayment,
    updatePayment,
    deletePayment
};
