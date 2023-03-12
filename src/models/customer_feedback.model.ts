import { DataTypes } from 'sequelize';
import { connection } from '../configs/db.config';

export const CustomerFeedback = connection.define(
  "Customer Feedback",
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true,
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    tableName: "customer_feedback",
    // Other model options go here
  }
);
