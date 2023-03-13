import { Model, DataTypes, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'

interface CustomerFBAttributes {
  id: number
  comment: string
  date: Date
}

interface CustomerFBCreationAttributes extends Optional<CustomerFBAttributes, 'id'> {}

class CustomerFeedbackModel extends Model<CustomerFBAttributes, CustomerFBCreationAttributes> implements CustomerFBAttributes {
  public id!: number
  public comment!: string
  public date!: Date
}

CustomerFeedbackModel.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    comment: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'customer_feedback',
    sequelize: connection,
    timestamps: true,
    underscored: true
  }
)

export { CustomerFeedbackModel, type CustomerFBAttributes }
