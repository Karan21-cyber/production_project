import { Router } from "express";
import workspaceController from "../controller/workspace-controller";

const router = Router();

router.post(
  "/v1/workspace",

  workspaceController.createWorkspace
);

router.get("/v1/workspace", workspaceController.getAllWorkspace);
router.get("/v1/workspace/:id", workspaceController.getWorkspaceByUserId);
router.put("/v1/workspace/:id", workspaceController.updateWorkspace);
router.delete("/v1/workspace/:id", workspaceController.deleteWorkspace);


const workspaceRouter = router;
export default workspaceRouter;
