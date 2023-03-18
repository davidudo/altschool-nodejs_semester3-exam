import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { CustomerModel } from './customer.model'
import { CustomerFeedbackModel } from './customer_feedback.model'
import { StaffModel } from './staff.model'

interface OrderAttributes {
  id: number
  customerId: number
  customerFBId: number | null
  staffId: number
  status: 'pending' | 'accepted' | 'delivered' | 'canceled' | 'expired'
  totalPrice: number
  deletedAt: Date | null
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class OrderModel extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number
  public customerId!: number
  public customerFBId!: number | null
  public staffId!: number
  public status!: 'pending' | 'accepted' | 'delivered' | 'canceled' | 'expired'
  public totalPrice!: number
  public deletedAt!: Date | null

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
      allowNull: true,
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
      type: DataTypes.ENUM('pending', 'accepted', 'delivered', 'canceled', 'expired'),
      defaultValue: 'pending',
      allowNull: false
    },
    totalPrice: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    sequelize: connection,
    tableName: 'order',
    modelName: 'OrderModel',
    timestamps: true
  }
)

OrderModel.belongsTo(CustomerModel, { foreignKey: 'customerId', as: 'customer' })
CustomerModel.hasMany(OrderModel, { foreignKey: 'customerId', as: 'orders' })

OrderModel.hasOne(CustomerFeedbackModel, { foreignKey: 'customerFBId', as: 'customerFeedback' })
CustomerFeedbackModel.belongsTo(OrderModel, { foreignKey: 'customerFBId', as: 'order' })

OrderModel.hasOne(StaffModel, { foreignKey: 'staffId', as: 'staff' })
StaffModel.belongsTo(OrderModel, { foreignKey: 'staffId', as: 'order' })

export { OrderModel, type OrderAttributes }
