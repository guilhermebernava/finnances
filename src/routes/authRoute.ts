import { Router } from "express";
import controller from "../controllers/AuthController";

const router = Router();

router.post("/auth", controller.post);
// router.delete("/auth", controller.delete);

export default router;
