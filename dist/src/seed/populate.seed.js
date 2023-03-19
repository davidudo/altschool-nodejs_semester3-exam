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
const colors_1 = __importDefault(require("colors"));
const db_config_1 = require("../configs/db.config");
const menu_item_model_1 = require("../models/menu_item.model");
const customer_model_1 = require("../models/customer.model");
const staff_model_1 = require("../models/staff.model");
const data_seed_1 = require("./data.seed");
void db_config_1.connection.sync({ force: true }).then(() => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Database seeding begins...'.yellow.bold);
    // Create sample menu items
    void menu_item_model_1.MenuItemModel.bulkCreate(data_seed_1.menuItemDatas);
    // Create sample customers
    void customer_model_1.CustomerModel.bulkCreate(data_seed_1.customerDatas);
    // Create sample staffs
    void staff_model_1.StaffModel.bulkCreate(data_seed_1.staffDatas);
    console.log(colors_1.default.green.bold('Database seeding completed!'));
}));
