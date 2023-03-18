"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
const customer_model_1 = require("./customer.model");
const customer_feedback_model_1 = require("./customer_feedback.model");
const staff_model_1 = require("./staff.model");
class OrderModel extends sequelize_1.Model {
}
exports.OrderModel = OrderModel;
OrderModel.init({
    // Model attributes are defined here
    id: {
        type: sequelize_1.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true
    },
    customerId: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: customer_model_1.CustomerModel,
            key: 'id'
        }
    },
    customerFBId: {
        type: sequelize_1.DataTypes.BIGINT,
        allowNull: true,
        references: {
            model: customer_feedback_model_1.CustomerFeedbackModel,
            key: 'id'
        }
    },
    staffId: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: staff_model_1.StaffModel,
            key: 'id'
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'accepted', 'delivered', 'canceled', 'expired'),
        defaultValue: 'pending',
        allowNull: false
    },
    totalPrice: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    sequelize: db_config_1.connection,
    tableName: 'order',
    modelName: 'OrderModel',
    timestamps: true
});
OrderModel.belongsTo(customer_model_1.CustomerModel, { foreignKey: 'customerId', as: 'customer' });
customer_model_1.CustomerModel.hasMany(OrderModel, { foreignKey: 'customerId', as: 'orders' });
OrderModel.hasOne(customer_feedback_model_1.CustomerFeedbackModel, { foreignKey: 'customerFBId', as: 'customerFeedback' });
customer_feedback_model_1.CustomerFeedbackModel.belongsTo(OrderModel, { foreignKey: 'customerFBId', as: 'order' });
OrderModel.hasOne(staff_model_1.StaffModel, { foreignKey: 'staffId', as: 'staff' });
staff_model_1.StaffModel.belongsTo(OrderModel, { foreignKey: 'staffId', as: 'order' });
