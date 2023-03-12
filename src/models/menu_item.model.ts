import { DataTypes } from 'sequelize';
import { connection } from '../configs/db.config';

export const MenuItem = connection.define(
  "Menu Item",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: true,
    },
  },
  {
    tableName: "menu_item",
    // Other model options go here
  }
);
