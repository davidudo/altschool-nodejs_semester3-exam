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
// import AuthModel from '../models/auth.model'
function getAllAuths(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getAllAuths');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function getAuthById(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('getAuthById');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function addAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('addAuth');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function updateAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('updateAuth');
            return res.status(200).json({
                status: true
            });
        }
        catch (error) {
            next(error);
        }
    });
}
function deleteAuth(req, res, next) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log('deleteAuth');
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
    getAllAuths,
    getAuthById,
    addAuth,
    updateAuth,
    deleteAuth
};
