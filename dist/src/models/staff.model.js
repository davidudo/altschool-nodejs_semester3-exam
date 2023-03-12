"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Staff = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
exports.Staff = db_config_1.connection.define('Staff', {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    rating: {
        type: sequelize_1.DataTypes.ENUM('1', '2', '3', '4', '5'),
        allowNull: false,
    },
}, {
    tableName: "staff",
    // Other model options go here
});
