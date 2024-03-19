import { Router } from "express";
import memberController from "../controller/member-controller";

const router = Router();

router.post(
  "/spaceworld/v1/members/:workspaceId",
  memberController.createmember
);

router.get("/spaceworld/v1/members", memberController.getAllmember);
router.get(
  "/spaceworld/v1/members/workpaces/:workspaceId",
  memberController.getmemberByWorkspaceId
);
router.post("/spaceworld/v1/members", memberController.getMemberBySearch);
router.put("/spaceworld/v1/members/:id", memberController.updatemember);
router.delete("/spaceworld/v1/members/:id", memberController.deletemember);
router.get(
  "/spaceworld/v1/members/folders/:folderId",
  memberController.getMemberByFolderId
);

const membersRouter = router;
export default membersRouter;
