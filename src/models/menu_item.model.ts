import { Model, DataTypes, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'

interface MenuItemAttributes {
  id: number
  imageUrl: string | null
  name: string
  description: string | null
  price: number
  deletedAt: Date | null
}

interface MenuItemCreationAttributes extends Optional<MenuItemAttributes, 'id'> {}

class MenuItemModel extends Model<MenuItemAttributes, MenuItemCreationAttributes> implements MenuItemAttributes {
  public id!: number
  public imageUrl!: string | null
  public name!: string
  public description!: string | null
  public price!: number
  public deletedAt!: Date | null
}

MenuItemModel.init(
  {
    // Model attributes are defined here
    id: {
      type: DataTypes.BIGINT,
      autoIncrement: true,
      primaryKey: true
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true
    },
    price: {
      type: DataTypes.DECIMAL,
      allowNull: false
    },
    deletedAt: {
      type: DataTypes.DATE,
      allowNull: true
    }
  },
  {
    tableName: 'menu_item',
    modelName: 'MenuItemModel',
    sequelize: connection,
    timestamps: true
  }
)

export { MenuItemModel, type MenuItemAttributes }
