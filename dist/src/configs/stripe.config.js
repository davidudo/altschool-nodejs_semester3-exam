"use strict";
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.stripeConfig = void 0;
exports.stripeConfig = {
    apiKey: (_a = process.env.STRIPE_SECRET_KEY) !== null && _a !== void 0 ? _a : '',
    publicKey: (_b = process.env.STRIPE_PUBLIC_KEY) !== null && _b !== void 0 ? _b : '',
};
