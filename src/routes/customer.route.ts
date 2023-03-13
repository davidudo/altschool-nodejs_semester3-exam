import express, { type Router } from 'express'
import customerController from '../controllers/customer.controller'

const customerRouter: Router = express.Router()

customerRouter.get('/', customerController.getAllCustomers)
customerRouter.get('/:id', customerController.getCustomerById)

customerRouter.post('/', customerController.addCustomer)

customerRouter.put('/:id', customerController.updateCustomer)

customerRouter.delete('/:id', customerController.deleteCustomer)

export default customerRouter
