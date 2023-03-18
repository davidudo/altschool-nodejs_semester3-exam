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
function orderSocket(socket, data) {
    return __awaiter(this, void 0, void 0, function* () {
        const receivedData = data;
        console.log(`Message received from ${socket.id}: ${receivedData}`);
        const { customer, order, customerFeedback } = receivedData;
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
        // TODO: Broadcast message to admin
        socket.broadcast.emit('order-status', { orderData });
    });
}
exports.default = orderSocket;
