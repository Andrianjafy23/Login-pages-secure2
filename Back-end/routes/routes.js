import express from "express";
import { login, register, password, authenticate, getUser, checkEmail } from "../controller/controller.js";


const router = express.Router();

router.post("/login", login);
router.post("/register", register);
router.get("/user", authenticate, getUser);
router.post("/check-email", checkEmail);
router.post("/password", password);


export default router;
