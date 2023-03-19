import colors from 'colors'
import { connection } from '../configs/db.config'

console.log(`Database ${colors.underline.bold.red('destruction')} begins...`)

function deleteAllData (): void {
  try {
    void connection.sync({ force: false })

    // Destroy all data in the tables
    void connection.query('TRUNCATE TABLE menu_item, order_item, staff, "order", customer, customer_feedback, payment CASCADE;')
  } catch (error) {
    console.error('Error deleting data:', error)
  }
}

deleteAllData()
