import { type Request, type Response, type NextFunction } from 'express'
import { PaymentModel, type PaymentAttributes } from '../models/payment.model'

async function getAllPayments (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getAllPayments')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function getPaymentById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getPaymentById')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function addPayment (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('addPayment')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function updatePayment (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('updatePayment')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function deletePayment (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('deletePayment')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllPayments,
  getPaymentById,
  addPayment,
  updatePayment,
  deletePayment
}
