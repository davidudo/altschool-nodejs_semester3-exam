"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Payment = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
exports.Payment = db_config_1.connection.define("Payment", {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    order_id: {
        type: sequelize_1.DataTypes.BIGINT,
        // foreignKey: true,
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    payment_gateway: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "payment",
    // Other model options go here
});
