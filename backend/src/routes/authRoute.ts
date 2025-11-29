import { Router } from "express";
import { register, login, getUserById } from "../controllers/authController";
const router = Router();

router.post("/register", register);
router.post("/login", login);
router.get("/user/:id", getUserById);
export default router;
