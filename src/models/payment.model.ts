import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { OrderModel } from './order.model'

interface PaymentAttributes {
  id: number
  order_id: number
  amount: number
  payment_gateway: number
  date: Date
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

class PaymentModel extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number
  public order_id!: number
  public amount!: number
  public payment_gateway!: number
  public date!: Date

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

PaymentModel.init(
  {
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    order_id: {
      type: DataTypes.BIGINT,
      references: {
        model: OrderModel,
        key: 'id'
      }
    },
    amount: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    payment_gateway: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    }
  },
  {
    tableName: 'payment',
    sequelize: connection,
    timestamps: true,
    underscored: true
  }
)

PaymentModel.hasOne(OrderModel, { foreignKey: 'order_id', as: 'order' })

export { PaymentModel, type PaymentAttributes }
