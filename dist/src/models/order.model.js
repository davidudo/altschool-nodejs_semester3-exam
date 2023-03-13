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
    customer_id: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: customer_model_1.CustomerModel,
            key: 'id'
        }
    },
    customer_fb_id: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: customer_feedback_model_1.CustomerFeedbackModel,
            key: 'id'
        }
    },
    staff_id: {
        type: sequelize_1.DataTypes.BIGINT,
        references: {
            model: staff_model_1.StaffModel,
            key: 'id'
        }
    },
    status: {
        type: sequelize_1.DataTypes.ENUM('pending', 'accepted', 'delivered', 'canceled'),
        allowNull: false
    },
    total_price: {
        type: sequelize_1.DataTypes.DECIMAL,
        allowNull: false
    },
    date: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: false
    }
}, {
    sequelize: db_config_1.connection,
    tableName: 'order',
    timestamps: true,
    underscored: true
});
OrderModel.belongsTo(customer_model_1.CustomerModel, { foreignKey: 'customer_id', as: 'customer' });
OrderModel.hasOne(customer_feedback_model_1.CustomerFeedbackModel, { foreignKey: 'customer_fb_id', as: 'customer_feedback' });
OrderModel.hasOne(staff_model_1.StaffModel, { foreignKey: 'staff_id', as: 'staff' });
