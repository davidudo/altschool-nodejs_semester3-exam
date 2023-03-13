import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'
import { OrderModel } from './order.model'
import { MenuItemModel } from './menu_item.model'

interface OrderItemAttributes {
  id: number
  order_id: number
  menu_item_id: number
  quantity: number
  notes: string | null
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id'> {}

class OrderItemModel extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number
  public order_id!: number
  public menu_item_id!: number
  public quantity!: number
  public notes!: string | null

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
    order_id: {
      type: DataTypes.BIGINT,
      references: {
        model: OrderModel,
        key: 'id'
      }
    },
    menu_item_id: {
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
    }
  },
  {
    tableName: 'order_item',
    sequelize: connection,
    timestamps: true,
    underscored: true
  }
)

OrderItemModel.belongsTo(OrderModel, { foreignKey: 'order_id', as: 'order' })
OrderItemModel.hasOne(MenuItemModel, { foreignKey: 'menu_item_id', as: 'menu_item' })

export { OrderItemModel, type OrderItemAttributes }
