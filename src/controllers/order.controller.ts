import { type Request, type Response, type NextFunction } from 'express'
import { OrderModel, type OrderAttributes } from '../models/order.model'

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
    const { customerId, customerFBId, staffId, status, totalPrice } = req.body

    const order: OrderAttributes = await OrderModel.create({
      customerId,
      customerFBId,
      staffId,
      status,
      totalPrice
    })

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
