import { Router } from "express";
import { healthCheck } from "../controllers/healthController";

const router = Router();

router.get("/health", healthCheck);

export { router as healthRoute };
