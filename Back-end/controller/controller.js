import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Fonction pour la connexion
export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: "Utilisateur non trouvé" });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    if (!process.env.SESSION_SECRET) {
      return res.status(500).json({ message: "Clé secrète manquante" });
    }

    const token = jwt.sign({ userId: foundUser._id }, process.env.SESSION_SECRET, { expiresIn: "1h" });

    res.json({
      token,
      user: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      message: "Connexion réussie",
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur interne du serveur", error: err.message });
  }
};

// Fonction pour l'inscription
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  if (!name || !email || !password) {
    return res.status(400).json({ message: "Tous les champs sont requis" });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();

    res.json({
      inscrit: newUser.name,
      message: "Inscription réussie",
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
  }
};

// Fonction pour obtenir les informations de l'utilisateur authentifié
export const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }
    res.json({ name: user.name, email: user.email });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la récupération de l'utilisateur", error: err.message });
  }
};

// Fonction pour réinitialiser le mot de passe
export const resetPassword = async (req, res) => {
  const { email, newPassword } = req.body;

  if (!email || !newPassword) {
    return res.status(400).json({ message: "L'email et le nouveau mot de passe sont requis" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Mot de passe réinitialisé avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de la réinitialisation du mot de passe", error: err.message });
  }
};
