// routes.js
import express from "express";
import User from "../models/user.js";
import { login, register } from "../controller/controller.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé, token manquant" });
  }

  if (!process.env.SESSION_SECRET) {
    return res.status(500).json({ message: "Clé secrète JWT non définie" });
  }

  try {
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded;
    console.log(decoded);
    next();
  } catch (err) {
    console.error("Erreur lors de la validation du token:", err.message);
    return res.status(401).json({ message: "Token invalide ou malformé", error: err.message });
  }
};



router.post("/login", login);
router.post("/register", register);

router.get("/user", authenticate, async (req, res) => {
  try {
    // Vérifiez que l'utilisateur existe en base de données
    const user = await User.findById(req.user.userId);  
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    // Renvoyer les informations utilisateur
    res.json({
      name: user.name,
      email: user.email
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur" });
  }
});


export default router;
