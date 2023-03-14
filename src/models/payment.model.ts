import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { OrderModel } from './order.model'

interface PaymentAttributes {
  id: number
  orderId: number
  amount: number
  paymentGateway: number
  date: Date
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

class PaymentModel extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number
  public orderId!: number
  public amount!: number
  public paymentGateway!: number
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
    orderId: {
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
    paymentGateway: {
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
    timestamps: true
  }
)

PaymentModel.hasOne(OrderModel, { foreignKey: 'orderId', as: 'order' })

export { PaymentModel, type PaymentAttributes }
