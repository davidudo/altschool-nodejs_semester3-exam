import { type Socket } from 'socket.io'
import { OrderModel } from '../models/order.model'
import { OrderItemModel } from '../models/order_item.model'
import { MenuItemModel } from '../models/menu_item.model'
import { CustomerModel } from '../models/customer.model'
import { CustomerFeedbackModel } from '../models/customer_feedback.model'
import { StaffModel } from '../models/staff.model'

function orderSocket (socket: Socket): void {
  const socketId: string = socket.id

  // Listen for messages
  socket.on('make-order', (data: any): void => {
    console.log(`Message received from ${socketId}: ${data}`)
    
    // Data format to be received from client
    const {
      customer: {
        id,
        name,
        address,
        phoneNumber
      },
      order: {
        id,
        orderItems: [
          {
            id,
            menuItems: [
              {
                id,
                imageUrl,
                name,
                description,
                price
              }
            ],
            quantity,
            notes
          }
        ],
        status,
        totalPrice
      },
      customerFeedback: {
        id,
        comment
      },
      staff: {
        id,
        name
      }
    } = data
    
    try {
      // Check if customer exists and create customer if not found
      const customerId: number = Number(customer.id)

      const customer = await CustomerModel.findByPk(customerId)
      
      if (customer == null) {
        const {
          imageUrl,
          name,
          email,
          phoneNumber,
          address
        } = customer
        
        await CustomerModel.create({
          imageUrl,
          name,
          email,
          phoneNumber,
          address
        })
      }
      
      // Check if customer feedback is available
      if (customerFeedback == null) {
        const comment = customerFeedback.comment
        
        const feedback = {
          comment
        }
        
        const customerfb = await CustomerFeedbackModel.create(feedback)
      }
      
      // TODO: for loop =>  Assign staff to deliver order
      const staffs = await StaffModel.findAll({
        where: { deletedAt: null }
      })
      
      const customerid = customer.id
      const customerFBId = customerfb.id
      const status = 'pending'
      const staffId
      const totalPrice = order.totalPrice
      
      // Create order
      const orderData = {
        customerId,
        customerFBId,
        staffId,
        status,
        totalPrice
      }
      
      const order = await OrderModel.create(orderData)
      
      // TODO: for loop => Create order item
      const orderId = order.id
      const menuItemId = order.orderItems.menuItems.id
      
      let orderItemData = {
        orderId,
        menuItemId,
        quantity,
        notes,
      }
      
      await OrderItemModel.create(orderItemData)
      
      // TODO: Broadcast message to admin
      socket.broadcast.emit('order-status', 'Order Successful, pending')
    } catch (error) {
      console.log(error)
    }
  })
}

export default orderSocket
