import { DataTypes } from 'sequelize';
import { connection } from '../configs/db.config';

export const Payment = connection.define(
  "Payment",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    order_id: {
        type: DataTypes.BIGINT,
        // foreignKey: true,
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    payment_gateway: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "payment",
    // Other model options go here
  }
);
