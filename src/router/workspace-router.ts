import { Router } from "express";
import workspaceController from "../controller/workspace-controller";

const router = Router();

router.post(
  "/spaceworld/v1/workspace/:userId",
  workspaceController.createWorkspace
);

router.post(
  "/spaceworld/v1/workspace/addUser/:workspaceId",
  workspaceController.addUserInWorkspace
);

router.get("/spaceworld/v1/workspace", workspaceController.getAllWorkspace);

router.get(
  "/spaceworld/v1/workspace/:id",
  workspaceController.getWorkspaceByUserId
);

router.put("/spaceworld/v1/workspace/:id", workspaceController.updateWorkspace);

router.delete(
  "/spaceworld/v1/workspace/:id",
  workspaceController.deleteWorkspace
);

const workspaceRouter = router;
export default workspaceRouter;
