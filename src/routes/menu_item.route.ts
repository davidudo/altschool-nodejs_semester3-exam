import express, { type Router } from 'express'
import menuItemController from '../controllers/menu_item.controller'

const menuItemRouter: Router = express.Router()

menuItemRouter.get('/', menuItemController.getAllMenuItems)
menuItemRouter.get('/:id', menuItemController.getMenuItemById)

menuItemRouter.post('/', menuItemController.addMenuItem)

menuItemRouter.put('/:id', menuItemController.updateMenuItem)

menuItemRouter.delete('/:id', menuItemController.deleteMenuItem)

export default menuItemRouter
