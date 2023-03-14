import { Model, DataTypes, type Optional } from 'sequelize'
import { connection } from '../configs/db.config'

interface CustomerAttributes {
  id: number
  imageUrl: string | null
  name: string | null
  email: string | null
  phoneNumber: string | null
  address: string | null
}

interface CustomerCreationAttributes extends Optional<CustomerAttributes, 'id'> {}

class CustomerModel extends Model<CustomerAttributes, CustomerCreationAttributes> implements CustomerAttributes {
  public id!: number
  public imageUrl!: string | null
  public name!: string | null
  public email!: string | null
  public phoneNumber!: string | null
  public address!: string | null
}

CustomerModel.init(
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
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      allowNull: true
    },
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: true
    },
    address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    tableName: 'customer',
    sequelize: connection,
    timestamps: true
    // Other model options go here
  }
)

export { CustomerModel, type CustomerAttributes }
