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
const menu_item_model_1 = require("../models/menu_item.model");
const customer_feedback_model_1 = require("../models/customer_feedback.model");
const staff_model_1 = require("../models/staff.model");
function getAllOrders(req, res, next) {
    var _a;
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const whereObject = {};
            const { customerId } = req.query;
            whereObject.deletedAt = null;
            if ((_a = customerId != null) !== null && _a !== void 0 ? _a : customerId != undefined) {
                whereObject.customerId = customerId;
            }
            const orders = yield order_model_1.OrderModel.findAll({
                where: whereObject,
                include: [
                    {
                        model: order_item_model_1.OrderItemModel,
                        as: 'orderItems',
                        include: [
                            {
                                model: menu_item_model_1.MenuItemModel,
                                as: 'menuItem',
                                attributes: ['id', 'name', 'price']
                            }
                        ]
                    },
                    {
                        model: staff_model_1.StaffModel,
                        as: 'staff'
                    },
                    {
                        model: customer_model_1.CustomerModel,
                        as: 'customer'
                    },
                    {
                        model: customer_feedback_model_1.CustomerFeedbackModel,
                        as: 'customerFeedback'
                    }
                ],
                order: [['createdAt', 'DESC']]
            });
            if (orders.length === 0) {
                return res.status(404).json({ message: 'No order found' });
            }
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
            const { customer, order, customerFeedback } = req.body;
            // Check if customer exists and create customer if not found
            const customerId = Number(customer.id);
            const customerData = yield customer_model_1.CustomerModel.findByPk(customerId);
            if (customerData == null) {
                const { name } = customer;
                yield customer_model_1.CustomerModel.create({
                    name
                });
            }
            let customerFBId = null;
            // Check if customer feedback is available
            if (customerFeedback != null) {
                const comment = customerFeedback.comment;
                console.log({ comment });
                const customerfb = yield customer_feedback_model_1.CustomerFeedbackModel.create({ comment });
                customerFBId = customerfb.id;
            }
            // Assign staff to deliver order
            const staffs = yield staff_model_1.StaffModel.findAll({
                where: { deletedAt: null, role: 'delivery' }
            });
            const randomIndex = Math.floor(Math.random() * staffs.length);
            // Choose a random staff
            const staff = staffs[randomIndex];
            const status = 'pending';
            const staffId = staff.id;
            const totalPrice = order.totalPrice;
            // Create order
            const orderData = {
                customerId,
                customerFBId,
                staffId,
                status,
                totalPrice
            };
            const orderResponse = yield order_model_1.OrderModel.create(orderData);
            // Create order item
            const orderItemsReceived = order.orderItems;
            for (const orderItemReceived of orderItemsReceived) {
                const orderId = orderResponse.id;
                const menuItemId = orderItemReceived.menuItem.id;
                const quantity = orderItemReceived.quantity;
                const notes = orderItemReceived.notes;
                const orderItemData = {
                    orderId,
                    menuItemId,
                    quantity,
                    notes
                };
                yield order_item_model_1.OrderItemModel.create(orderItemData);
            }
            return res.status(200).json({
                status: true,
                orderData
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
            const { status, customerId } = req.body;
            const order = yield order_model_1.OrderModel.findOne({ where: { id: orderId, deletedAt: null } });
            if (order == null) {
                return res.status(404).send(`Customer with id ${orderId} not found`);
            }
            order.status = status !== null && status !== void 0 ? status : order.status;
            order.customerId = customerId !== null && customerId !== void 0 ? customerId : order.customerId;
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
