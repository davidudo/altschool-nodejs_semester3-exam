import { type Request, type Response, type NextFunction } from 'express'
import { OrderModel, type OrderAttributes } from '../models/order.model'

async function getAllOrders (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getAllOrders')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function getOrderById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getOrderById')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function addOrder (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('addOrder')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function updateOrder (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('updateOrder')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function deleteOrder (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('deleteOrder')

    return res.status(200).json({
      status: true
    })
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
