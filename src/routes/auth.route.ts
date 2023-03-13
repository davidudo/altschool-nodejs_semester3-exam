import express, { type Router } from 'express'
import authController from '../controllers/auth.controller'

const authRouter: Router = express.Router()

authRouter.get('/', authController.getAllAuths)
authRouter.get('/:id', authController.getAuthById)

authRouter.post('/', authController.addAuth)

authRouter.put('/:id', authController.updateAuth)

authRouter.delete('/:id', authController.deleteAuth)

export default authRouter
