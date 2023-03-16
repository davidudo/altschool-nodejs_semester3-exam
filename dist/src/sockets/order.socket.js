"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const order_item_model_1 = require("../models/order_item.model");
const customer_model_1 = require("../models/customer.model");
const customer_feedback_model_1 = require("../models/customer_feedback.model");
const staff_model_1 = require("../models/staff.model");
function orderSocket(socket) {
    const socketId = socket.id;
    // Listen for messages
    socket.on('make-order', (data) => {
        console.log(`Message received from ${socketId}: ${data}`);
        // Data format to be received from client
        const { customer: { id, name, address, phoneNumber }, order: { id, orderItems: [{ id, menuItems: [{ id, imageUrl, name, description, price }], quantity, notes }], status, totalPrice }, customerFeedback: { id, comment }, staff: { id, name } } = data;
        try {
            // Check if customer exists and create customer if not found
            const customerId = Number(customer.id);
            const customer = yield customer_model_1.CustomerModel.findByPk(customerId);
            if (customer == null) {
                const { imageUrl, name, email, phoneNumber, address } = customer;
                yield customer_model_1.CustomerModel.create({
                    imageUrl,
                    name,
                    email,
                    phoneNumber,
                    address
                });
            }
            // Check if customer feedback is available
            if (customerFeedback == null) {
                const comment = customerFeedback.comment;
                const feedback = {
                    comment
                };
                const customerfb = yield customer_feedback_model_1.CustomerFeedbackModel.create(feedback);
            }
            // TODO: for loop =>  Assign staff to deliver order
            const staffs = yield staff_model_1.StaffModel.findAll({
                where: { deletedAt: null }
            });
            const customerid = customer.id;
            const customerFBId = customerfb.id;
            const status = 'pending';
            const staffId;
            const totalPrice = order.totalPrice;
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
            const menuItemId = order.orderItems.menuItems.id;
            let orderItemData = {
                orderId,
                menuItemId,
                quantity,
                notes,
            };
            yield order_item_model_1.OrderItemModel.create(orderItemData);
            // TODO: Broadcast message to admin
            socket.broadcast.emit('order-status', 'Order Successful, pending');
        }
        catch (error) {
            console.log(error);
        }
    });
}
exports.default = orderSocket;
