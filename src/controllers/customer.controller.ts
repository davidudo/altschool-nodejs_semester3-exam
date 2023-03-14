import { type Request, type Response, type NextFunction } from 'express'
import { CustomerModel, type CustomerAttributes } from '../models/customer.model'

async function getAllCustomers (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const customers = await CustomerModel.findAll()

    return res.status(200).json({
      status: true,
      customers
    })
  } catch (error) {
    next(error)
  }
}

async function getCustomerById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const customerId: number = Number(req.params.id)

    const customer = await CustomerModel.findByPk(customerId)

    if (customer == null) {
      return res.status(404).json({ message: 'Customer not found' })
    }

    return res.status(200).json({
      status: true,
      customer
    })
  } catch (error) {
    next(error)
  }
}

async function addCustomer (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { imageUrl, name, email, phoneNumber, address } = req.body

    // Create a new customer using the Customer model
    const customer: CustomerAttributes = await CustomerModel.create({
      imageUrl,
      name,
      email,
      phoneNumber,
      address
    })

    return res.status(200).json({
      status: true,
      customer
    })
  } catch (error) {
    next(error)
  }
}

async function updateCustomer (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const customerId: number = Number(req.params.id)
    const { imageUrl, name, email, phoneNumber, address } = req.body

    const customer = await CustomerModel.findOne({ where: { id: customerId } })

    if (customer == null) {
      return res.status(404).send(`Customer with id ${customerId} not found`)
    }

    customer.imageUrl = imageUrl ?? customer.imageUrl
    customer.name = name ?? customer.name
    customer.email = email ?? customer.email
    customer.phoneNumber = phoneNumber ?? customer.phoneNumber
    customer.address = address ?? customer.address

    await customer.save()

    return res.status(200).json({
      status: true,
      customer
    })
  } catch (error) {
    next(error)
  }
}

async function deleteCustomer (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const customerId = req.params.id
    const customer = await CustomerModel.findOne({ where: { id: customerId } })

    if (customer == null) {
      res.status(404).json({ error: 'Customer not found' })
      return
    }

    await CustomerModel.destroy({ where: { id: customerId } })

    return res.status(200).json({
      status: true,
      message: 'Customer successfully deleted'
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllCustomers,
  getCustomerById,
  addCustomer,
  updateCustomer,
  deleteCustomer
}
