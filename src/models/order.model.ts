import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { CustomerModel } from './customer.model'
import { CustomerFeedbackModel } from './customer_feedback.model'
import { StaffModel } from './staff.model'

interface OrderAttributes {
  id: number
  customer_id: number
  customer_fb_id: number
  staff_id: number
  status: 'pending' | 'accepted' | 'delivered' | 'canceled'
  total_price: number
  date: Date
}

interface OrderCreationAttributes extends Optional<OrderAttributes, 'id'> {}

class OrderModel extends Model<OrderAttributes, OrderCreationAttributes> implements OrderAttributes {
  public id!: number
  public customer_id!: number
  public customer_fb_id!: number
  public staff_id!: number
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
    customer_id: {
      type: DataTypes.BIGINT,
      references: {
        model: CustomerModel,
        key: 'id'
      }
    },
    customer_fb_id: {
      type: DataTypes.BIGINT,
      references: {
        model: CustomerFeedbackModel,
        key: 'id'
      }
    },
    staff_id: {
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
    timestamps: true,
    underscored: true
  }
)

OrderModel.belongsTo(CustomerModel, { foreignKey: 'customer_id', as: 'customer' })
OrderModel.hasOne(CustomerFeedbackModel, { foreignKey: 'customer_fb_id', as: 'customer_feedback' })
OrderModel.hasOne(StaffModel, { foreignKey: 'staff_id', as: 'staff' })

export { OrderModel, type OrderAttributes }
