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
function getAllOrders(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getAllOrders');
            return res.status(200).json({
                status: true
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
            console.log('getOrderById');
            return res.status(200).json({
                status: true
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
            console.log('addOrder');
            return res.status(200).json({
                status: true
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
            console.log('updateOrder');
            return res.status(200).json({
                status: true
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
            console.log('deleteOrder');
            return res.status(200).json({
                status: true
            });
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
