import { Router } from "express";
import userController from "../controller/user-controller";
import validationMiddleware from "../middleware/validation-middleware";
import { createUserSchema } from "../schema/user-schema";

const router = Router();

router.post(
  "/spaceworld/v1/user",
  validationMiddleware(createUserSchema),
  userController.createUser
);

router.get("/spaceworld/v1/user", userController.getAllUser);
router.get("/spaceworld/v1/user/:id", userController.getUserById);
router.put("/spaceworld/v1/user/:id", userController.updateUser);
router.delete("/spaceworld/v1/user/:id", userController.deleteUser);
router.put("/spaceworld/v1/user/:id/image", userController.uploadImage);

const userRouter = router;
export default userRouter;
