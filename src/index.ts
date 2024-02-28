import express, { type Request, type Response } from 'express'
import prisma from './prisma'
import errorMiddleware from './middleware/error-middleware'
import authRouter from './router/auth-router'

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

prisma
  .$connect()
  .then(() => {
    app.listen(3000, () => {
      console.log('Server started on port 3000')
    })
  })
  .catch(async (e: Error) => {
    console.log(e.message)
    await prisma.$disconnect()
    process.exit(1)
  })
