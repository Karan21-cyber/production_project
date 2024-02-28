import { Router } from 'express'
import authController from '../controller/auth-controller'
import validationMiddleware from '../middleware/validation-middleware'
import { loginUserSchema } from '../schema/user-schema'

const router = Router()

router.post(
  '/v1/login',
  validationMiddleware(loginUserSchema),
  authController.userLogin
)
router.post('/v1/logout/:id', authController.userLogOut)
router.post('/v1/refresh', authController.refreshLogin)

const authRouter = router
export default authRouter
