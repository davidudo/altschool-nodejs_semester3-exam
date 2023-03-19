import colors from 'colors'
import { connection } from '../configs/db.config'
import { MenuItemModel } from '../models/menu_item.model'
import { CustomerModel } from '../models/customer.model'
import { StaffModel } from '../models/staff.model'
import { customerDatas, menuItemDatas, staffDatas } from './data.seed'

void connection.sync({ force: true }).then(async () => {
  console.log('Database seeding begins...'.yellow.bold)

  // Create sample menu items
  void MenuItemModel.bulkCreate(menuItemDatas)

  // Create sample customers
  void CustomerModel.bulkCreate(customerDatas)

  // Create sample staffs
  void StaffModel.bulkCreate(staffDatas)

  console.log(colors.green.bold('Database seeding completed!'))
})
