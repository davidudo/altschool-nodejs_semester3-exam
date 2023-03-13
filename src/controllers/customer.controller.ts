import { type Request, type Response, type NextFunction } from 'express'
import { CustomerModel, type CustomerAttributes } from '../models/customer.model'

async function getAllCustomers (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getAllCustomers')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function getCustomerById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getCustomerById')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function addCustomer (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('addCustomer')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function updateCustomer (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('updateCustomer')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function deleteCustomer (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('deleteCustomer')

    return res.status(200).json({
      status: true
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
