import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { OrderModel } from './order.model'

interface PaymentAttributes {
  id: number
  orderId: number
  amount: number
  paymentGateway: number
  deletedAt: Date | null
}

interface PaymentCreationAttributes extends Optional<PaymentAttributes, 'id'> {}

class PaymentModel extends Model<PaymentAttributes, PaymentCreationAttributes> implements PaymentAttributes {
  public id!: number
  public orderId!: number
  public amount!: number
  public paymentGateway!: number
  public deletedAt!: Date | null

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
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'payment',
    modelName: 'PaymentModel',
    sequelize: connection,
    timestamps: true
  }
)

PaymentModel.hasOne(OrderModel, { foreignKey: 'orderId', as: 'order' })
OrderModel.belongsTo(PaymentModel, { foreignKey: 'orderId', as: 'payment' })

export { PaymentModel, type PaymentAttributes }
