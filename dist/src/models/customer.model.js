"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerModel = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class CustomerModel extends sequelize_1.Model {
}
exports.CustomerModel = CustomerModel;
CustomerModel.init({
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
        allowNull: true
    },
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: true
    },
    phoneNumber: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    address: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: true
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'customer',
    sequelize: db_config_1.connection,
    timestamps: true
    // Other model options go here
});
