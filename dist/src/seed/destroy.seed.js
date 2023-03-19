"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const colors_1 = __importDefault(require("colors"));
const db_config_1 = require("../configs/db.config");
console.log(`Database ${colors_1.default.underline.bold.red('destruction')} begins...`);
function deleteAllData() {
    try {
        void db_config_1.connection.sync({ force: false });
        // Destroy all data in the tables
        void db_config_1.connection.query('TRUNCATE TABLE menu_item, order_item, staff, "order", customer, customer_feedback, payment CASCADE;');
    }
    catch (error) {
        console.error('Error deleting data:', error);
    }
}
deleteAllData();
