"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItem = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
exports.MenuItem = db_config_1.connection.define("Menu Item", {
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true,
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true,
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: true,
    },
}, {
    tableName: "menu_item",
    // Other model options go here
});
