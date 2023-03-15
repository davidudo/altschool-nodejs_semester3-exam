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
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
function getAllOrders(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orders = yield order_model_1.OrderModel.findAll({
                where: { deletedAt: null }
            });
            return res.status(200).json({
                status: true,
                orders
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getOrderById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = Number(req.params.id);
            const order = yield order_model_1.OrderModel.findOne({
                where: { id: orderId, deletedAt: null }
            });
            if (order == null) {
                return res.status(404).json({ message: 'Order not found' });
            }
            return res.status(200).json({
                status: true,
                order
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function addOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { customerId, customerFBId, staffId, status, totalPrice } = req.body;
            const order = yield order_model_1.OrderModel.create({
                customerId,
                customerFBId,
                staffId,
                status,
                totalPrice
            });
            return res.status(200).json({
                status: true,
                order
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = Number(req.params.id);
            const { status } = req.body;
            const order = yield order_model_1.OrderModel.findOne({ where: { id: orderId, deletedAt: null } });
            if (order == null) {
                return res.status(404).send(`Customer with id ${orderId} not found`);
            }
            order.status = status !== null && status !== void 0 ? status : order.status;
            yield order.save();
            return res.status(200).json({
                status: true,
                order
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteOrder(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const orderId = Number(req.params.id);
            const order = yield order_model_1.OrderModel.findOne({
                where: { id: orderId, deletedAt: null }
            });
            if (order == null) {
                return res.status(404).json({ message: 'Order not found' });
            }
            else {
                order.deletedAt = new Date();
                yield order.save();
                return res.status(200).json({
                    status: true,
                    message: 'Order deleted successfully'
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getAllOrders,
    getOrderById,
    addOrder,
    updateOrder,
    deleteOrder
};
