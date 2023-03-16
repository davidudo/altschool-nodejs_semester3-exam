"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StaffModel = void 0;
const sequelize_1 = require("sequelize");
const db_config_1 = require("../configs/db.config");
class StaffModel extends sequelize_1.Model {
}
exports.StaffModel = StaffModel;
StaffModel.init({
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
    email: {
        type: sequelize_1.DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    role: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false
    },
    rating: {
        type: sequelize_1.DataTypes.ENUM('1', '2', '3', '4', '5'),
        defaultValue: '1',
        allowNull: false
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
        allowNull: true
    }
}, {
    tableName: 'staff',
    sequelize: db_config_1.connection,
    timestamps: true,
    underscored: true
});
