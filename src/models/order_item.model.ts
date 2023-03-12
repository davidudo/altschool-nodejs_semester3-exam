import { DataTypes } from 'sequelize';
import { connection } from '../configs/db.config';

export const OrderItem = connection.define(
  "Order Item",
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
    menu_item_id: {
        type: DataTypes.BIGINT,
        // foreignKey: true,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    tableName: "order_item",
    // Other model options go here
  }
);
