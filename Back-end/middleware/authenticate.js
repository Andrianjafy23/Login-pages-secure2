import jwt from 'jsonwebtoken';

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
