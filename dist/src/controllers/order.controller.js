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
const order_item_model_1 = require("../models/order_item.model");
const customer_model_1 = require("../models/customer.model");
const customer_feedback_model_1 = require("../models/customer_feedback.model");
const staff_model_1 = require("../models/staff.model");
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
            // Data format to be received from client
            let receivedData = {
                customer: {
                    id,
                    name,
                    address,
                    phoneNumber
                },
                order: {
                    id,
                    orderItems: [
                        {
                            id,
                            menuItems: [
                                {
                                    id,
                                    imageUrl,
                                    name,
                                    description,
                                    price
                                }
                            ],
                            quantity,
                            notes
                        }
                    ],
                    status,
                    totalPrice
                },
                customerFeedback: {
                    id,
                    comment
                },
                staff: {
                    id,
                    name
                }
            };
            // Check if customer exists and create customer if not found
            const customerId = Number(receivedData.customer.id);
            const customer = yield customer_model_1.CustomerModel.findByPk(customerId);
            if (customer == null) {
                const { imageUrl, name, email, phoneNumber, address } = receivedData.customer;
                yield customer_model_1.CustomerModel.create({
                    imageUrl,
                    name,
                    email,
                    phoneNumber,
                    address
                });
            }
            // Check if customer feedback is available
            if (receivedData.customerFeedback == null) {
                const comment = receivedData.customerFeedback.comment;
                const feedback = {
                    comment
                };
                const customerfb = yield customer_feedback_model_1.CustomerFeedbackModel.create(feedback);
            }
            // TODO: for loop =>  Assign staff to deliver order
            const staffs = yield staff_model_1.StaffModel.findAll({
                where: { deletedAt: null }
            });
            const customerid = receivedData.customer.id;
            const customerFBId = customerfb.id;
            const status = 'pending';
            const staffId;
            const totalPrice = receivedData.order.totalPrice;
            // Create order
            const orderData = {
                customerId,
                customerFBId,
                staffId,
                status,
                totalPrice
            };
            const order = yield order_model_1.OrderModel.create(orderData);
            // TODO: for loop => Create order item
            const orderId = order.id;
            const menuItemId = receivedData.order.orderItems.menuItems.id;
            let orderItemData = {
                orderId,
                menuItemId,
                quantity,
                notes,
            };
            yield order_item_model_1.OrderItemModel.create(orderItemData);
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
