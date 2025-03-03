import express from "express";
import { login, register, resetPassword, getUser } from "../controller/controller.js";
import { authenticate } from "../middleware/authenticate.js";

const router = express.Router();

// Route pour la connexion
router.post("/login", login);

// Route pour l'inscription
router.post("/register", register);

// Route pour obtenir les informations de l'utilisateur authentifié
router.get("/user", authenticate, getUser);

// Route pour réinitialiser le mot de passe
router.post("/reset-password", resetPassword);

export default router;
