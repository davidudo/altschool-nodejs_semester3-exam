import { type Request, type Response, type NextFunction } from 'express'
import StripePackage from 'stripe'
import { stripeConfig } from '../configs/stripe.config'
import { PaymentModel, type PaymentAttributes } from '../models/payment.model'

async function getAllPayments (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const payments = await PaymentModel.findAll({
      where: { deletedAt: null }
    })

    return res.status(200).json({
      status: true,
      payments
    })
  } catch (error) {
    next(error)
  }
}

async function getPaymentById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const paymentId: number = Number(req.params.id)
    const payment = await PaymentModel.findOne({
      where: { id: paymentId, deletedAt: null }
    })

    if (payment == null) {
      return res.status(404).json({ message: 'Payment not found' })
    }

    return res.status(200).json({
      status: true,
      payment
    })
  } catch (error) {
    next(error)
  }
}

async function addPayment (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { orderId, amount, paymentGateway } = req.body

    const config: StripePackage.StripeConfig = {
      apiVersion: '2022-11-15'
    }

    const stripe = new StripePackage(stripeConfig.apiKey, config)

    const charge = await stripe.charges.create({
      amount,
      currency: 'usd',
      description: 'Example charge',
      source: 'tok_visa' // replace with an actual token obtained from Stripe.js or Elements
    })

    const payment: PaymentAttributes = await PaymentModel.create({
      orderId,
      amount,
      paymentGateway
    })

    return res.status(200).json({
      status: true,
      payment,
      charge
    })
  } catch (error) {
    next(error)
  }
}

async function updatePayment (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const paymentId: number = Number(req.params.id)
    const { orderId, amount, paymentGateway } = req.body

    const payment = await PaymentModel.findOne({ where: { id: paymentId, deletedAt: null } })

    if (payment == null) {
      return res.status(404).send(`Customer with id ${paymentId} not found`)
    }

    payment.orderId = orderId ?? payment.orderId
    payment.amount = amount ?? payment.amount
    payment.paymentGateway = paymentGateway ?? payment.paymentGateway

    await payment.save()

    return res.status(200).json({
      status: true,
      payment
    })
  } catch (error) {
    next(error)
  }
}

async function deletePayment (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const paymentId = Number(req.params.id)
    const payment = await PaymentModel.findOne({
      where: { id: paymentId, deletedAt: null }
    })

    if (payment == null) {
      return res.status(404).json({ message: 'Payment not found' })
    } else {
      payment.deletedAt = new Date()
      await payment.save()

      return res.status(200).json({
        status: true,
        message: 'Payment deleted successfully'
      })
    }
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
