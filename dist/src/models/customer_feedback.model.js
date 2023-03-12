"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerFeedback = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
exports.CustomerFeedback = db_config_1.connection.define("Customer Feedback", {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    comment: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "customer_feedback",
    // Other model options go here
});
