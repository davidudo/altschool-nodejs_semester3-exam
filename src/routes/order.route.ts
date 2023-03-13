import express, { type Router } from 'express'
import orderController from '../controllers/order.controller'

const orderRouter: Router = express.Router()

orderRouter.get('/', orderController.getAllOrders)
orderRouter.get('/:id', orderController.getOrderById)

orderRouter.post('/', orderController.addOrder)

orderRouter.put('/:id', orderController.updateOrder)

orderRouter.delete('/:id', orderController.deleteOrder)

export default orderRouter
