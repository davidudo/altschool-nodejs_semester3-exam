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
const customer_model_1 = require("../models/customer.model");
function getAllCustomers(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const customers = yield customer_model_1.CustomerModel.findAll();
            return res.status(200).json({
                status: true,
                customers
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
            const customerId = Number(req.params.id);
            const customer = yield customer_model_1.CustomerModel.findByPk(customerId);
            if (customer == null) {
                return res.status(404).json({ message: 'Customer not found' });
            }
            return res.status(200).json({
                status: true,
                customer
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
            const { imageUrl, name, email, phoneNumber, address } = req.body;
            // Create a new customer using the Customer model
            const customer = yield customer_model_1.CustomerModel.create({
                imageUrl,
                name,
                email,
                phoneNumber,
                address
            });
            return res.status(200).json({
                status: true,
                customer
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
            const customerId = Number(req.params.id);
            const { imageUrl, name, email, phoneNumber, address } = req.body;
            const customer = yield customer_model_1.CustomerModel.findOne({ where: { id: customerId } });
            if (customer == null) {
                return res.status(404).send(`Customer with id ${customerId} not found`);
            }
            customer.imageUrl = imageUrl !== null && imageUrl !== void 0 ? imageUrl : customer.imageUrl;
            customer.name = name !== null && name !== void 0 ? name : customer.name;
            customer.email = email !== null && email !== void 0 ? email : customer.email;
            customer.phoneNumber = phoneNumber !== null && phoneNumber !== void 0 ? phoneNumber : customer.phoneNumber;
            customer.address = address !== null && address !== void 0 ? address : customer.address;
            yield customer.save();
            return res.status(200).json({
                status: true,
                customer
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
            const customerId = req.params.id;
            const customer = yield customer_model_1.CustomerModel.findOne({ where: { id: customerId } });
            if (customer == null) {
                res.status(404).json({ error: 'Customer not found' });
                return;
            }
            yield customer_model_1.CustomerModel.destroy({ where: { id: customerId } });
            return res.status(200).json({
                status: true,
                message: 'Customer successfully deleted'
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
