import { type Request, type Response, type NextFunction } from 'express'
import { StaffModel, type StaffAttributes } from '../models/staff.model'

async function getAllStaffs (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const staffs = await StaffModel.findAll({
      where: { deletedAt: null }
    })

    return res.status(200).json({
      status: true,
      staffs
    })
  } catch (error) {
    next(error)
  }
}

async function getStaffById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const staffId: number = Number(req.params.id)
    const staff = await StaffModel.findOne({
      where: { id: staffId, deletedAt: null }
    })

    if (staff == null) {
      return res.status(404).json({ message: 'Staff not found' })
    }

    return res.status(200).json({
      status: true,
      staff
    })
  } catch (error) {
    next(error)
  }
}

async function addStaff (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { imageUrl, name, email, role, rating } = req.body

    const staff: StaffAttributes = await StaffModel.create({
      imageUrl,
      name,
      email,
      role,
      rating
    })

    return res.status(200).json({
      status: true,
      staff
    })
  } catch (error) {
    next(error)
  }
}

async function updateStaff (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const staffId: number = Number(req.params.id)
    const { imageUrl, name, email, role, rating } = req.body

    const staff = await StaffModel.findOne({ where: { id: staffId, deletedAt: null } })

    if (staff == null) {
      return res.status(404).send(`Customer with id ${staffId} not found`)
    }

    staff.imageUrl = imageUrl ?? staff.imageUrl
    staff.name = name ?? staff.name
    staff.email = email ?? staff.email
    staff.role = role ?? staff.role
    staff.rating = rating ?? staff.rating

    await staff.save()

    return res.status(200).json({
      status: true,
      staff
    })
  } catch (error) {
    next(error)
  }
}

async function deleteStaff (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const staffId = Number(req.params.id)
    const staff = await StaffModel.findOne({
      where: { id: staffId, deletedAt: null }
    })

    if (staff == null) {
      return res.status(404).json({ message: 'Staff not found' })
    } else {
      staff.deletedAt = new Date()
      await staff.save()

      return res.status(200).json({
        status: true,
        message: 'Staff deleted successfully'
      })
    }
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
