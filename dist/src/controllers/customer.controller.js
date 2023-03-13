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
function getAllCustomers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getAllCustomers');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getCustomerById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getCustomerById');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function addCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('addCustomer');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('updateCustomer');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteCustomer(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('deleteCustomer');
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
    getAllCustomers,
    getCustomerById,
    addCustomer,
    updateCustomer,
    deleteCustomer
};
