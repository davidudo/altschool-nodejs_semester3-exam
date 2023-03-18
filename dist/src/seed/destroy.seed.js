"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const order_model_1 = require("../models/order.model");
const order_item_model_1 = require("../models/order_item.model");
const menu_item_model_1 = require("../models/menu_item.model");
const customer_model_1 = require("../models/customer.model");
const customer_feedback_model_1 = require("../models/customer_feedback.model");
const staff_model_1 = require("../models/staff.model");
const payment_model_1 = require("../models/payment.model");
console.log('Database ' + 'destruction'.underline.bold.red + ' begins...');
// Destroy all data in the tables
order_item_model_1.OrderItemModel.destroy({ truncate: true });
menu_item_model_1.MenuItemModel.destroy({ truncate: true });
order_model_1.OrderModel.destroy({ truncate: true });
customer_model_1.CustomerModel.destroy({ truncate: true });
customer_feedback_model_1.CustomerFeedbackModel.destroy({ truncate: true });
staff_model_1.StaffModel.destroy({ truncate: true });
payment_model_1.PaymentModel.destroy({ truncate: true });
// Disconnect from the database
sequelize.close();
console.log('Database destruction complete'.green.bold);
