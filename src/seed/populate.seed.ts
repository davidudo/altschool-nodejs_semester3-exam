import colors from 'colors'
import { OrderModel } from '../models/order.model'
import { OrderItemModel } from '../models/order_item.model'
import { MenuItemModel } from '../models/menu_item.model'
import { CustomerModel } from '../models/customer.model'
import { CustomerFeedbackModel } from '../models/customer_feedback.model'
import { StaffModel } from '../models/staff.model'
import { PaymentModel } from '../models/payment.model'

sequelize.sync({ force: true }).then(async () => {
  console.log('Database seeding begins...'.yellow.bold)
  
  // Create sample menu items
  const menuItems = await MenuItemModel.bulkCreate([
    { name: 'Cheeseburger', price: 8.99 },
    { name: 'Chicken Tenders', price: 6.99 },
    { name: 'French Fries', price: 2.99 },
    { name: 'Onion Rings', price: 3.99 },
  ]);

  // Create a sample order
  const order = await OrderModel.create({ status: 'pending', totalPrice: 0 });

  // Add order items to the order
  await OrderItemModel.bulkCreate([
    { orderId: order.id, menuItemId: menuItems[0].id, quantity: 2, price: menuItems[0].price },
    { orderId: order.id, menuItemId: menuItems[1].id, quantity: 1, price: menuItems[1].price },
    { orderId: order.id, menuItemId: menuItems[2].id, quantity: 1, price: menuItems[2].price },
  ]);

  console.log('Database seeding completed!'.green.bold);
});
