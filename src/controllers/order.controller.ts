import { type Request, type Response, type NextFunction } from 'express'
import { OrderModel, type OrderAttributes } from '../models/order.model'
import { OrderItemModel } from '../models/order_item.model'
import { MenuItemModel } from '../models/menu_item.model'
import { CustomerModel } from '../models/customer.model'
import { CustomerFeedbackModel } from '../models/customer_feedback.model'
import { StaffModel } from '../models/staff.model'

async function getAllOrders (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const orders = await OrderModel.findAll({
      where: { deletedAt: null }
    })

    return res.status(200).json({
      status: true,
      orders
    })
  } catch (error) {
    next(error)
  }
}

async function getOrderById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const orderId: number = Number(req.params.id)
    const order = await OrderModel.findOne({
      where: { id: orderId, deletedAt: null }
    })

    if (order == null) {
      return res.status(404).json({ message: 'Order not found' })
    }

    return res.status(200).json({
      status: true,
      order
    })
  } catch (error) {
    next(error)
  }
}

async function addOrder (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    // Data format to be received from client
    let receivedData = {
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
    }
    
    // Check if customer exists and create customer if not found
    const customerId: number = Number(receivedData.customer.id)

    const customer = await CustomerModel.findByPk(customerId)
    
    if (customer == null) {
      const {
        imageUrl,
        name,
        email,
        phoneNumber,
        address
      } = receivedData.customer
      
      await CustomerModel.create({
        imageUrl,
        name,
        email,
        phoneNumber,
        address
      })
    }
    
    // Check if customer feedback is available
    if (receivedData.customerFeedback == null) {
      const comment = receivedData.customerFeedback.comment
      
      const feedback = {
        comment
      }
      
      const customerfb = await CustomerFeedbackModel.create(feedback)
    }
    
    // TODO: for loop =>  Assign staff to deliver order
    const staffs = await StaffModel.findAll({
      where: { deletedAt: null }
    })
    
    const customerid = receivedData.customer.id
    const customerFBId = customerfb.id
    const status = 'pending'
    const staffId
    const totalPrice = receivedData.order.totalPrice
    
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
    const menuItemId = receivedData.order.orderItems.menuItems.id
    
    let orderItemData = {
      orderId,
      menuItemId,
      quantity,
      notes,
    }
    
    await OrderItemModel.create(orderItemData)
    
    return res.status(200).json({
      status: true,
      order
    })
  } catch (error) {
    next(error)
  }
}

async function updateOrder (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const orderId: number = Number(req.params.id)
    const { status } = req.body

    const order = await OrderModel.findOne({ where: { id: orderId, deletedAt: null } })

    if (order == null) {
      return res.status(404).send(`Customer with id ${orderId} not found`)
    }

    order.status = status ?? order.status

    await order.save()

    return res.status(200).json({
      status: true,
      order
    })
  } catch (error) {
    next(error)
  }
}

async function deleteOrder (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const orderId = Number(req.params.id)
    const order = await OrderModel.findOne({
      where: { id: orderId, deletedAt: null }
    })

    if (order == null) {
      return res.status(404).json({ message: 'Order not found' })
    } else {
      order.deletedAt = new Date()
      await order.save()

      return res.status(200).json({
        status: true,
        message: 'Order deleted successfully'
      })
    }
  } catch (error) {
    next(error)
  }
}

export default {
  getAllOrders,
  getOrderById,
  addOrder,
  updateOrder,
  deleteOrder
}
