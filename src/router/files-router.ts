import { Router } from "express";
import fileController from "../controller/file-controller";

const router = Router();

router.post(
  "/spaceworld/v1/files/:folderId",
  fileController.createfile
);

router.get("/spaceworld/v1/files", fileController.getAllFiles);
router.get("/spaceworld/v1/files/:id", fileController.getfileByUserId);
router.put("/spaceworld/v1/files/:id", fileController.updatefile);
router.delete("/spaceworld/v1/files/:id", fileController.deletefile);

const filesRouter = router;
export default filesRouter;
