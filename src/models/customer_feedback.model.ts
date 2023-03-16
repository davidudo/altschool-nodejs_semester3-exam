import { Model, DataTypes, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'

interface CustomerFBAttributes {
  id: number
  comment: string
  deletedAt: Date | null
}

interface CustomerFBCreationAttributes extends Optional<CustomerFBAttributes, 'id'> {}

class CustomerFeedbackModel extends Model<CustomerFBAttributes, CustomerFBCreationAttributes> implements CustomerFBAttributes {
  public id!: number
  public comment!: string
  public deletedAt!: Date | null
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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'customer_feedback',
    sequelize: connection,
    timestamps: true
  }
)

export { CustomerFeedbackModel, type CustomerFBAttributes }
