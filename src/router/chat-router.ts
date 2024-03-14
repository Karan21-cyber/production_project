import { Router } from "express";
import chatController from "../controller/chat-controller";

const router = Router();

router.post("/spaceworld/v1/chats/:folderId", chatController.createChat);
// router.get("/spaceworld/v1/chats", chatController.getAllchats);
router.get("/spaceworld/v1/chats/:id", chatController.getChatById);
// router.put("/spaceworld/v1/chats/:id", chatController.updatechats);
// router.delete("/spaceworld/v1/chats/:id", chatController.deletechats);

const chatssRouter = router;
export default chatssRouter;
