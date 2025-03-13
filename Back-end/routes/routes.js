import express from "express";
import { login, register, password, authenticate, getUser, checkEmail, changePassword } from "../controller/controller.js";


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user", authenticate, getUser);
router.post("/check-email", checkEmail);
router.patch("/reset-password", password);
router.patch("/change-password", authenticate, changePassword);



export default router;
