import { Router } from "express";
import fileController from "../controller/file-controller";

const router = Router();

router.post(
  "/v1/files",

  fileController.createfile
);

router.get("/v1/files", fileController.getAllFiles);
router.get("/v1/files/:id", fileController.getfileByUserId);
router.put("/v1/files/:id", fileController.updatefile);
router.delete("/v1/files/:id", fileController.deletefile);

const filesRouter = router;
export default filesRouter;
