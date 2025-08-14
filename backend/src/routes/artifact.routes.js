import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { withPagination } from "../middlewares/pagination.middleware.js";
import { listArtifacts, getMyArtifacts, createMyArtifact } from "../controllers/artifact.controller.js";

const router = Router();

router.get("/", withPagination(), listArtifacts);
router.post("/", authMiddleware, createMyArtifact);

router.get("/user", authMiddleware, withPagination(), getMyArtifacts);

export default router;
