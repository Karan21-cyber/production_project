import { Router } from "express";
import folderController from "../controller/folder-controller";

const router = Router();

router.post(
  "/spaceworld/v1/folders/:workspaceId",
  folderController.createfolder
);

router.post(
  "/spaceworld/v1/folders/addUser/:folderId",
  folderController.addUsersInFolder
);

router.get("/spaceworld/v1/folders", folderController.getAllFolder);

router.get(
  "/spaceworld/v1/folders/user/:id",
  folderController.getfolderByUserId
);

router.get(
  "/spaceworld/v1/folders/workspace/:id",
  folderController.getFolderByWorkspaceId
);
router.get("/spaceworld/v1/folders/:id", folderController.getFolderByFolderId);

router.put("/spaceworld/v1/folders/:id", folderController.updatefolder);
router.delete("/spaceworld/v1/folders/:id", folderController.deletefolder);

const foldersRouter = router;
export default foldersRouter;
