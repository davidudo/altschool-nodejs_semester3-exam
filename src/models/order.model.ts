import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { CustomerModel } from './customer.model'
import { CustomerFeedbackModel } from './customer_feedback.model'
import { StaffModel } from './staff.model'

interface OrderAttributes {
  id: number
  customerId: number
  customerFBId: number
  staffId: number
  status: 'pending' | 'accepted' | 'delivered' | 'canceled'
  total_price: number
  date: Date
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class OrderModel extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number
  public customerId!: number
  public customerFBId!: number
  public staffId!: number
  public status!: 'pending' | 'accepted' | 'delivered' | 'canceled'
  public total_price!: number
  public date!: Date

  // timestamps!
  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderModel.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    customerId: {
      type: DataTypes.BIGINT,
      references: {
        model: CustomerModel,
        key: 'id'
      }
    },
    customerFBId: {
      type: DataTypes.BIGINT,
      references: {
        model: CustomerFeedbackModel,
        key: 'id'
      }
    },
    staffId: {
      type: DataTypes.BIGINT,
      references: {
        model: StaffModel,
        key: 'id'
      }
    },
    status: {
      type: DataTypes.ENUM('pending', 'accepted', 'delivered', 'canceled'),
      allowNull: false
    },
    total_price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    sequelize: connection,
    tableName: 'order',
    timestamps: true
  }
)

OrderModel.belongsTo(CustomerModel, { foreignKey: 'customer_id', as: 'customer' })
OrderModel.hasOne(CustomerFeedbackModel, { foreignKey: 'customerFBId', as: 'customer_feedback' })
OrderModel.hasOne(StaffModel, { foreignKey: 'staffId', as: 'staff' })

export { OrderModel, type OrderAttributes }
