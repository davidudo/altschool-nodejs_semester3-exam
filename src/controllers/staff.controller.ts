import { type Request, type Response, type NextFunction } from 'express'
import { StaffModel, type StaffAttributes } from '../models/staff.model'

async function getAllStaffs (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getAllStaffs')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function getStaffById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getStaffById')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function addStaff (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('addStaff')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function updateStaff (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('updateStaff')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function deleteStaff (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('deleteStaff')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllStaffs,
  getStaffById,
  addStaff,
  updateStaff,
  deleteStaff
}
