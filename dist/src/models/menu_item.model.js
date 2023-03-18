"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MenuItemModel = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class MenuItemModel extends sequelize_1.Model {
}
exports.MenuItemModel = MenuItemModel;
MenuItemModel.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    imageUrl: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    name: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'menu_item',
    modelName: 'MenuItemModel',
    sequelize: db_config_1.connection,
    timestamps: true
});
