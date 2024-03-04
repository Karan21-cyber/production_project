import { Router } from "express";
import folderController from "../controller/folder-controller";

const router = Router();

router.post(
  "/v1/files",

  folderController.createfolder
);

router.get("/v1/files", folderController.getAllFolder);
router.get("/v1/folders/:id", folderController.getfolderByUserId);
router.put("/v1/folders/:id", folderController.updatefolder);
router.delete("/v1/folders/:id", folderController.deletefolder);

const foldersRouter = router;
export default foldersRouter;
