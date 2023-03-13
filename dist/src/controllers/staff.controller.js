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
function getAllStaffs(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getAllStaffs');
            return res.status(200).json({
                status: true
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
            console.log('getStaffById');
            return res.status(200).json({
                status: true
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
            console.log('addStaff');
            return res.status(200).json({
                status: true
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
            console.log('updateStaff');
            return res.status(200).json({
                status: true
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
            console.log('deleteStaff');
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
    getAllStaffs,
    getStaffById,
    addStaff,
    updateStaff,
    deleteStaff
};
