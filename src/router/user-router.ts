import { Router } from "express";
import userController from "../controller/user-controller";
import validationMiddleware from "../middleware/validation-middleware";
import { createUserSchema } from "../schema/user-schema";

const router = Router();

router.post(
  "/v1/user",
  validationMiddleware(createUserSchema),
  userController.createUser
);

router.get("/v1/user", userController.getAllUser);
router.get("/v1/user/:id", userController.getUserById);
router.put("/v1/user/:id", userController.updateUser);
router.delete("/v1/user/:id", userController.deleteUser);

router.post("/v1/sendmail", userController.sendNodemailer);

const userRouter = router;
export default userRouter;
