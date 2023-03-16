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
const menu_item_model_1 = require("../models/menu_item.model");
function getAllMenuItems(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItems = yield menu_item_model_1.MenuItemModel.findAll({
                where: { deletedAt: null }
            });
            return res.status(200).json({
                status: true,
                menuItems
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getMenuItemById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItemId = Number(req.params.id);
            const menuItem = yield menu_item_model_1.MenuItemModel.findOne({
                where: { id: menuItemId, deletedAt: null }
            });
            if (menuItem == null) {
                return res.status(404).json({ message: 'MenuItem not found' });
            }
            return res.status(200).json({
                status: true,
                menuItem
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function addMenuItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { imageUrl, name, description, price } = req.body;
            const menuItem = yield menu_item_model_1.MenuItemModel.create({
                imageUrl,
                name,
                description,
                price
            });
            return res.status(200).json({
                status: true,
                menuItem
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateMenuItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItemId = Number(req.params.id);
            const { imageUrl, name, description, price } = req.body;
            const menuItem = yield menu_item_model_1.MenuItemModel.findOne({ where: { id: menuItemId, deletedAt: null } });
            if (menuItem == null) {
                return res.status(404).send(`Menu Item with id ${menuItemId} not found`);
            }
            menuItem.imageUrl = imageUrl !== null && imageUrl !== void 0 ? imageUrl : menuItem.imageUrl;
            menuItem.name = name !== null && name !== void 0 ? name : menuItem.name;
            menuItem.description = description !== null && description !== void 0 ? description : menuItem.description;
            menuItem.price = price !== null && price !== void 0 ? price : menuItem.price;
            yield menuItem.save();
            return res.status(200).json({
                status: true,
                menuItem
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteMenuItem(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const menuItemId = Number(req.params.id);
            const menuItem = yield menu_item_model_1.MenuItemModel.findOne({
                where: { id: menuItemId, deletedAt: null }
            });
            if (menuItem == null) {
                return res.status(404).json({ message: 'Menu Item not found' });
            }
            else {
                menuItem.deletedAt = new Date();
                yield menuItem.save();
                return res.status(200).json({
                    status: true,
                    message: 'MenuItem deleted successfully'
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getAllMenuItems,
    getMenuItemById,
    addMenuItem,
    updateMenuItem,
    deleteMenuItem
};
