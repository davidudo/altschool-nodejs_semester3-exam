import { DataTypes } from 'sequelize';
import { connection } from '../configs/db.config';

export const Order = connection.define(
  "Order",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    customer_id: {
        type: DataTypes.BIGINT,
        // foreignKey: true,
    },
    customer_fb_id: {
        type: DataTypes.BIGINT,
        // foreignKey: true,
    },
    staff_id: {
        type: DataTypes.BIGINT,
        // foreignKey: true,
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'delivered', 'canceled'),
      allowNull: false,
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "order",
    // Other model options go here
  }
);
