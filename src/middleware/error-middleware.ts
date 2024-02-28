import { type Request, type Response } from 'express'
import HttpException from '../utils/http-exception'

const errorMiddleware = (err: unknown, req: Request, res: Response) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message
    })
  }

  return res.status(500).json({
    success: false,
    message: 'Internal server Error.'
  })
}

export default errorMiddleware
