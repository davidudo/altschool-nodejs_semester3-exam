"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PaymentModel = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
const order_model_1 = require("./order.model");
class PaymentModel extends sequelize_1.Model {
}
exports.PaymentModel = PaymentModel;
PaymentModel.init({
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    order_id: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: order_model_1.OrderModel,
            key: 'id'
        }
    },
    amount: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    payment_gateway: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'payment',
    sequelize: db_config_1.connection,
    timestamps: true,
    underscored: true
});
PaymentModel.hasOne(order_model_1.OrderModel, { foreignKey: 'order_id', as: 'order' });
