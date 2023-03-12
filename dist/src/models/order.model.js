"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Order = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
exports.Order = db_config_1.connection.define("Order", {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    customer_id: {
        type: sequelize_1.DataTypes.BIGINT,
        // foreignKey: true,
    },
    customer_fb_id: {
        type: sequelize_1.DataTypes.BIGINT,
        // foreignKey: true,
    },
    staff_id: {
        type: sequelize_1.DataTypes.BIGINT,
        // foreignKey: true,
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'accepted', 'delivered', 'canceled'),
        allowNull: false,
    },
    total_price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false,
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false,
    },
}, {
    tableName: "order",
    // Other model options go here
});
