import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

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
      email: newUser.email,
      message: "Inscription réussie",
    });
  } catch (err) {
    res.status(500).json({ message: "Erreur lors de l'inscription", error: err.message });
  }
};


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


export const authenticate = (req, res, next) => {
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
    next();
  } catch (err) {
    return res.status(401).json({ message: "Token invalide ou malformé", error: err.message });
  }
};

export const checkEmail = async (req, res) => {
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "L'email est requis" });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "Email non trouvé" });
    }

    res.json({ message: "Email valide" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};

export const password = async (req, res) => {
  const { email, newPassword, confirmPassword } = req.body;

  if (!email || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "L'email et les mots de passe sont requis." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
  }

  try {
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Mot de passe modifié avec succès" });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};


export const changePassword = async (req, res) => {
  console.log("Utilisateur en session :", req.user); // Vérification

  const { currentPassword, newPassword, confirmPassword } = req.body;

  if (!req.user || !req.user.userId) {
    return res.status(401).json({ message: "Non autorisé. Aucun utilisateur authentifié." });
  }

  if (!currentPassword || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Tous les champs sont requis." });
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Les mots de passe ne correspondent pas." });
  }

  try {
    const user = await User.findById(req.user.userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé" });
    }

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe actuel incorrect." });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Mot de passe modifié avec succès." });
  } catch (err) {
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
};
