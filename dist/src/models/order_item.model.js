"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderItemModel = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
const order_model_1 = require("./order.model");
const menu_item_model_1 = require("./menu_item.model");
class OrderItemModel extends sequelize_1.Model {
}
exports.OrderItemModel = OrderItemModel;
OrderItemModel.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    orderId: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: order_model_1.OrderModel,
            key: 'id'
        }
    },
    menuItemId: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: menu_item_model_1.MenuItemModel,
            key: 'id'
        }
    },
    quantity: {
        type: sequelize_1.DataTypes.INTEGER,
        defaultValue: 1,
        allowNull: false
    },
    notes: {
        type: sequelize_1.DataTypes.TEXT,
        allowNull: true
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'order_item',
    modelName: 'OrderItem',
    sequelize: db_config_1.connection,
    timestamps: true
});
OrderItemModel.belongsTo(order_model_1.OrderModel, { foreignKey: 'orderId', as: 'order' });
order_model_1.OrderModel.hasMany(OrderItemModel, { foreignKey: 'orderId', as: 'orderItems' });
menu_item_model_1.MenuItemModel.belongsTo(OrderItemModel, { foreignKey: 'menuItemId', as: 'orderItem' });
OrderItemModel.hasOne(menu_item_model_1.MenuItemModel, { foreignKey: 'menuItemId', as: 'menuItem' });
