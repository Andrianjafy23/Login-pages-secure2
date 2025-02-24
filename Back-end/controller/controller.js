import User from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const foundUser = await User.findOne({ email });

    if (!foundUser) {
      return res.status(400).json({ message: 'Utilisateur non trouvé' });
    }

    const match = await bcrypt.compare(password, foundUser.password);
    if (!match) {
      return res.status(400).json({ message: 'Mot de passe incorrect' });
    }

    // Vérifiez si la clé secrète est définie
    const secret = process.env.SESSION_SECRET;
    if (!secret) {
      return res.status(500).json({ message: 'Clé secrète manquante' });
    }

    const token = jwt.sign(
      { userId: foundUser._id },  // Assurez-vous que l'ID de l'utilisateur est bien encodé
      secret,
      { expiresIn: '1h' }
    );
    

    res.json({
      user: foundUser._id,
      name: foundUser.name,
      email: foundUser.email,
      message: 'Connexion réussie',
      token, // Ajoutez le token dans la réponse
    });
  } catch (err) {
    console.error('Erreur lors de la tentative de connexion:', err);
    res.status(500).json({ message: 'Erreur interne du serveur', error: err.message });
  }
};

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "Tous les champs sont requis",
    });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();
    console.log("Requête d'inscription reçue :", req.body);
    console.log(`Nouvel utilisateur inscrit : ${name} (${email})`);

    res.json({
      inscrit: newUser.name,
      message: "Inscription réussie",
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      message: "Erreur lors de l'inscription",
    });
  }
};
