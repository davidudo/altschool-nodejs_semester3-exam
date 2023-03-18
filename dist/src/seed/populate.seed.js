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
const menu_item_model_1 = require("../models/menu_item.model");
sequelize.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database seeding begins...'.yellow.bold);
    // Create sample menu items
    const menuItems = yield menu_item_model_1.MenuItemModel.bulkCreate([
        { name: 'Cheeseburger', price: 8.99 },
        { name: 'Chicken Tenders', price: 6.99 },
        { name: 'French Fries', price: 2.99 },
        { name: 'Onion Rings', price: 3.99 },
    ]);
    // Create a sample order
    const order = yield order_model_1.OrderModel.create({ status: 'pending', totalPrice: 0 });
    // Add order items to the order
    yield order_item_model_1.OrderItemModel.bulkCreate([
        { orderId: order.id, menuItemId: menuItems[0].id, quantity: 2, price: menuItems[0].price },
        { orderId: order.id, menuItemId: menuItems[1].id, quantity: 1, price: menuItems[1].price },
        { orderId: order.id, menuItemId: menuItems[2].id, quantity: 1, price: menuItems[2].price },
    ]);
    console.log('Database seeding completed!'.green.bold);
}));
