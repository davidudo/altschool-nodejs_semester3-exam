import { type Request, type Response, type NextFunction } from 'express'
// import AuthModel from '../models/auth.model'

async function getAllAuths (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getAllAuths')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function getAuthById (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('getAuthById')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function addAuth (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('addAuth')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function updateAuth (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('updateAuth')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

async function deleteAuth (req: Request, res: Response, next: NextFunction): Promise<any> {
  try {
    console.log('deleteAuth')

    return res.status(200).json({
      status: true
    })
  } catch (error) {
    next(error)
  }
}

export default {
  getAllAuths,
  getAuthById,
  addAuth,
  updateAuth,
  deleteAuth
}
