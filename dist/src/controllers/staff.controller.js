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
const staff_model_1 = require("../models/staff.model");
function getAllStaffs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const staffs = yield staff_model_1.StaffModel.findAll({
                where: { deletedAt: null }
            });
            return res.status(200).json({
                status: true,
                staffs
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getStaffById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const staffId = Number(req.params.id);
            const staff = yield staff_model_1.StaffModel.findOne({
                where: { id: staffId, deletedAt: null }
            });
            if (staff == null) {
                return res.status(404).json({ message: 'Staff not found' });
            }
            return res.status(200).json({
                status: true,
                staff
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function addStaff(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const { imageUrl, name, email, role, rating } = req.body;
            const staff = yield staff_model_1.StaffModel.create({
                imageUrl,
                name,
                email,
                role,
                rating
            });
            return res.status(200).json({
                status: true,
                staff
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateStaff(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const staffId = Number(req.params.id);
            const { imageUrl, name, email, role, rating } = req.body;
            const staff = yield staff_model_1.StaffModel.findOne({ where: { id: staffId, deletedAt: null } });
            if (staff == null) {
                return res.status(404).send(`Staff with id ${staffId} not found`);
            }
            staff.imageUrl = imageUrl !== null && imageUrl !== void 0 ? imageUrl : staff.imageUrl;
            staff.name = name !== null && name !== void 0 ? name : staff.name;
            staff.email = email !== null && email !== void 0 ? email : staff.email;
            staff.role = role !== null && role !== void 0 ? role : staff.role;
            staff.rating = rating !== null && rating !== void 0 ? rating : staff.rating;
            yield staff.save();
            return res.status(200).json({
                status: true,
                staff
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteStaff(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const staffId = Number(req.params.id);
            const staff = yield staff_model_1.StaffModel.findOne({
                where: { id: staffId, deletedAt: null }
            });
            if (staff == null) {
                return res.status(404).json({ message: 'Staff not found' });
            }
            else {
                staff.deletedAt = new Date();
                yield staff.save();
                return res.status(200).json({
                    status: true,
                    message: 'Staff deleted successfully'
                });
            }
        }
        catch (error) {
            next(error);
        }
    });
}
exports.default = {
    getAllStaffs,
    getStaffById,
    addStaff,
    updateStaff,
    deleteStaff
};
