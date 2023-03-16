import { type Request, type Response, type NextFunction } from 'express'
import { MenuItemModel, type MenuItemAttributes } from '../models/menu_item.model'

async function getAllMenuItems (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const menuItems = await MenuItemModel.findAll({
      where: { deletedAt: null }
    })

    return res.status(200).json({
      status: true,
      menuItems
    })
  } catch (error) {
    next(error)
  }
}

async function getMenuItemById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const menuItemId: number = Number(req.params.id)
    const menuItem = await MenuItemModel.findOne({
      where: { id: menuItemId, deletedAt: null }
    })

    if (menuItem == null) {
      return res.status(404).json({ message: 'MenuItem not found' })
    }

    return res.status(200).json({
      status: true,
      menuItem
    })
  } catch (error) {
    next(error)
  }
}

async function addMenuItem (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const { imageUrl, name, description, price } = req.body

    const menuItem: MenuItemAttributes = await MenuItemModel.create({
      imageUrl,
      name,
      description,
      price
    })

    return res.status(200).json({
      status: true,
      menuItem
    })
  } catch (error) {
    next(error)
  }
}

async function updateMenuItem (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const menuItemId: number = Number(req.params.id)
    const { imageUrl, name, description, price } = req.body

    const menuItem = await MenuItemModel.findOne({ where: { id: menuItemId, deletedAt: null } })

    if (menuItem == null) {
      return res.status(404).send(`Menu Item with id ${menuItemId} not found`)
    }

    menuItem.imageUrl = imageUrl ?? menuItem.imageUrl
    menuItem.name = name ?? menuItem.name
    menuItem.description = description ?? menuItem.description
    menuItem.price = price ?? menuItem.price

    await menuItem.save()

    return res.status(200).json({
      status: true,
      menuItem
    })
  } catch (error) {
    next(error)
  }
}

async function deleteMenuItem (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    const menuItemId = Number(req.params.id)
    const menuItem = await MenuItemModel.findOne({
      where: { id: menuItemId, deletedAt: null }
    })

    if (menuItem == null) {
      return res.status(404).json({ message: 'Menu Item not found' })
    } else {
      menuItem.deletedAt = new Date()
      await menuItem.save()

      return res.status(200).json({
        status: true,
        message: 'MenuItem deleted successfully'
      })
    }
  } catch (error) {
    next(error)
  }
}

export default {
  getAllMenuItems,
  getMenuItemById,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
}
