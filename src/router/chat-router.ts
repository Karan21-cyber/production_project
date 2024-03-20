import { Router } from "express";
import chatController from "../controller/user-chat-controller";

const router = Router();

router.get("/spaceworld/v1/chats/:id", chatController.getChatsById);

const chatRouter = router;
export default chatRouter;
