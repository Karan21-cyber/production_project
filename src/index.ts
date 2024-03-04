import express, { type Request, type Response } from 'express'
import prisma from './prisma'
import errorMiddleware from './middleware/error-middleware'
import authRouter from './router/auth-router'
import createSubscriptionProduct from './service/payment-sevices'

const app = express()
app.use(express.json())

app.get('/', (req: Request, res: Response) => {
 
  res.json({
    success: true,
    Status_Code: 200,
    message: 'Welcome to Production Project Server...'
  })
})

app.use(authRouter)
app.use(errorMiddleware)

createSubscriptionProduct();

prisma
  .$connect()
  .then(() => {
    app.listen(5500, () => {
      console.log('Server started on port 5500')
    })
  })
  .catch(async (e: Error) => {
    console.log(e.message)
    await prisma.$disconnect()
    process.exit(1)
  })
