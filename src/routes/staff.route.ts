import express, { type Router } from 'express'
import staffController from '../controllers/staff.controller'

const staffRouter: Router = express.Router()

staffRouter.get('/', staffController.getAllStaffs)
staffRouter.get('/:id', staffController.getStaffById)

staffRouter.post('/', staffController.addStaff)

staffRouter.put('/:id', staffController.updateStaff)

staffRouter.delete('/:id', staffController.deleteStaff)

export default staffRouter
