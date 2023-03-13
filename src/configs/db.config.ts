import dotenv from 'dotenv'
import { Sequelize } from 'sequelize'

dotenv.config()

const PGHOST: string | undefined = process.env.PGHOST
const PGDATABASE: string | undefined = process.env.PGDATABASE
const PGUSER: string | undefined = process.env.PGUSER
const PGPASSWORD: string | undefined = process.env.PGPASSWORD

const connection: Sequelize = new Sequelize(PGDATABASE!, PGUSER!, PGPASSWORD, {
  host: PGHOST!,
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true
    }
  }
})

const dbConnection = async (): Promise<void> => {
  try {
    await connection.authenticate()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }

  try {
    await connection.sync({ force: false })
  } catch (error) {
    console.log(error)
  }
}

export { dbConnection, connection }
