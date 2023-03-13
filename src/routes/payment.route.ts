import express, { type Router } from 'express'
import paymentController from '../controllers/payment.controller'

const paymentRouter: Router = express.Router()

paymentRouter.get('/', paymentController.getAllPayments)
paymentRouter.get('/:id', paymentController.getPaymentById)

paymentRouter.post('/', paymentController.addPayment)

paymentRouter.put('/:id', paymentController.updatePayment)

paymentRouter.delete('/:id', paymentController.deletePayment)

export default paymentRouter
