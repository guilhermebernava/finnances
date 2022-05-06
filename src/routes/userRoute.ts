import { Router } from "express";
import AclController from "../controllers/AclController";

const router = Router();

router.get("/users", AclController.getAllUsers);
router.get("/user/:id", AclController.getById);
router.post("/user", AclController.post);
router.put("/user/:id", AclController.put)
router.delete("/user/:id", AclController.delete);

export default router;
