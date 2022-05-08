import { Router } from "express";
import roles from "../middlewares/Roles";
import AclController from "../controllers/AclController";
import auth from "../middlewares/Auth";

const router = Router();

router.get("/users", auth, roles("ADMIN"), AclController.getAllUsers);
router.get("/user", AclController.getByName);
router.get("/user/:id", AclController.getById);
router.post("/user", AclController.post);
//passando PARAMS para uma rota
router.get("/user/verify_email/:token", AclController.verifyEmail);
router.post("/user/forgot_password", AclController.forgotPassword);
router.post("/user/change_password/:token", AclController.changePassword )
router.put("/user/:id", AclController.put);
router.delete("/user/:id", AclController.delete);
router.put("/user/restore/:id", AclController.restore);

export default router;
