// routes.js
import express from "express";
import { login, register } from "../controller/controller.js";
import jwt from 'jsonwebtoken';

const router = express.Router();

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  
  if (!token) {
    return res.status(401).json({ message: "Accès non autorisé, token manquant" });
  }

  try {
    // Vérifie que le token est valide
    const decoded = jwt.verify(token, process.env.SESSION_SECRET);
    req.user = decoded;  // Stocker les données décodées du token dans req.user
    next();
  } catch (err) {
    console.error('Erreur lors de la validation du token:', err.message);
    return res.status(401).json({ message: "Token invalide ou malformé", error: err.message });
  }
};


router.post("/login", login);
router.post("/register", register);

router.get("/user", authenticate, async (req, res) => {
  try {
    // Vérifiez que l'utilisateur existe en base de données
    const user = await User.findById(req.user.userId);  // Utilisez le userId stocké dans le token
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

// Exportation par défaut du routeur
export default router;
