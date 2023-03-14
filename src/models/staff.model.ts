import { DataTypes, Model, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'

interface StaffAttributes {
  id: number
  imageUrl: string | null
  name: string
  email: string
  role: string
  rating: '1' | '2' | '3' | '4' | '5'
}

interface StaffCreationAttributes extends Optional<StaffAttributes, 'id'> {}

class StaffModel extends Model<StaffAttributes, StaffCreationAttributes> implements StaffAttributes {
  public id!: number
  public imageUrl!: string | null
  public name!: string
  public email!: string
  public role!: string
  public rating!: '1' | '2' | '3' | '4' | '5'

  public readonly createdAt!: Date
  public readonly updatedAt!: Date
}

StaffModel.init(
  {
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
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.ENUM('1', '2', '3', '4', '5'),
      allowNull: false
    }
  },
  {
    tableName: 'staff',
    sequelize: connection,
    timestamps: true,
    underscored: true
  }
)

export { StaffModel, type StaffAttributes }
