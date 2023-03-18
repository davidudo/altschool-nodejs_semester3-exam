import { type Request, type Response, type NextFunction } from 'express'
import { OrderModel, type OrderAttributes } from '../models/order.model'
import { OrderItemModel } from '../models/order_item.model'
import { CustomerModel, type CustomerAttributes } from '../models/customer.model'
import { MenuItemModel } from '../models/menu_item.model'
import { CustomerFeedbackModel, type CustomerFBAttributes } from '../models/customer_feedback.model'
import { StaffModel } from '../models/staff.model'

async function getAllOrders (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { customerId } = req.body
    const whereObject: any = { deletedAt: null }

    if (customerId != null) {
      whereObject.customerId = customerId
    }

    const orders = await OrderModel.findAll({
      where: whereObject,
      include: [
        {
          model: OrderItemModel,
          as: 'orderItems',
          include: [
            {
              model: MenuItemModel,
              as: 'menuItem',
              attributes: ['id', 'name', 'price']
            }
          ]
        },
        {
          model: StaffModel,
          as: 'staff'
        },
        {
          model: CustomerModel,
          as: 'customer'
        },
        {
          model: CustomerFeedbackModel,
          as: 'customerFeedback'
        }
      ],
      order: [['createdAt', 'DESC']]
    })

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No order found' })
    }

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
    const {
      customer,
      order,
      customerFeedback
    } = req.body

    // Check if customer exists and create customer if not found
    const customerId: number = Number(customer.id)

    const customerData: CustomerAttributes | null = await CustomerModel.findByPk(customerId)

    if (customerData == null) {
      const {
        name
      } = customer

      await CustomerModel.create({
        name
      })
    }

    let customerFBId: number | null = null

    // Check if customer feedback is available
    if (customerFeedback != null) {
      const comment = customerFeedback.comment
      console.log({ comment })

      const customerfb: CustomerFBAttributes = await CustomerFeedbackModel.create({ comment })

      customerFBId = customerfb.id
    }

    // Assign staff to deliver order
    const staffs = await StaffModel.findAll({
      where: { deletedAt: null, role: 'delivery' }
    })

    const randomIndex: number = Math.floor(Math.random() * staffs.length)

    // Choose a random staff
    const staff = staffs[randomIndex]

    const status: 'pending' = 'pending'
    const staffId: number = staff.id
    const totalPrice = order.totalPrice

    // Create order
    const orderData = {
      customerId,
      customerFBId,
      staffId,
      status,
      totalPrice
    }

    const orderResponse: OrderAttributes = await OrderModel.create(orderData)

    // Create order item
    const orderItemsReceived = order.orderItems

    for (const orderItemReceived of orderItemsReceived) {
      const orderId: number = orderResponse.id
      const menuItemId: number = orderItemReceived.menuItem.id
      const quantity: number = orderItemReceived.quantity
      const notes: string | null = orderItemReceived.notes

      const orderItemData = {
        orderId,
        menuItemId,
        quantity,
        notes
      }

      await OrderItemModel.create(orderItemData)
    }

    return res.status(200).json({
      status: true,
      orderData
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
