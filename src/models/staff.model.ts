import { DataTypes } from 'sequelize';
import { connection } from '../configs/db.config';

export const Staff = connection.define(
  'Staff',
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rating: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: false,
    },
  },
  {
    tableName: "staff",
    // Other model options go here
  }
);
