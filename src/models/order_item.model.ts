import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { OrderModel } from './order.model'
import { MenuItemModel } from './menu_item.model'

interface OrderItemAttributes {
  id: number
  orderId: number
  menuItemId: number
  quantity: number
  notes: string | null
  deletedAt: Date | null
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

class OrderItemModel extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number
  public orderId!: number
  public menuItemId!: number
  public quantity!: number
  public notes!: string | null
  public deletedAt!: Date | null

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

OrderItemModel.init(
  {
    // Model attributes are defined here
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
    menuItemId: {
      type: DataTypes.BIGINT,
      references: {
        model: MenuItemModel,
        key: 'id'
      }
    },
    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    notes: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'order_item',
    sequelize: connection,
    timestamps: true
  }
)

OrderItemModel.belongsTo(OrderModel, { foreignKey: 'orderId', as: 'order' })
OrderItemModel.hasOne(MenuItemModel, { foreignKey: 'menuItemId', as: 'menuItem' })

export { OrderItemModel, type OrderItemAttributes }
