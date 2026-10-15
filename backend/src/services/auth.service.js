const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const env = require('../config/env');
const AppError = require('../utils/AppError');
const usersRepository = require('../repositories/users.repository');

const INVALID_CREDENTIALS_MESSAGE = 'Email ou mot de passe incorrect';

const generateToken = (userId) =>
  jwt.sign({ sub: String(userId) }, env.jwtSecret, { expiresIn: env.jwtExpiresIn });

// Renvoie l'id de l'utilisateur contenu dans le token, ou lève une 401
const verifyToken = (token) => {
  try {
    const payload = jwt.verify(token, env.jwtSecret);
    return Number(payload.sub);
  } catch {
    throw new AppError(401, 'Token invalide ou expiré');
  }
};

const login = async (email, password) => {
  const credentials = await usersRepository.findCredentialsByEmail(email.trim().toLowerCase());
  const isPasswordValid =
    credentials !== null && (await bcrypt.compare(password, credentials.passwordHash));

  if (!isPasswordValid) {
    throw new AppError(401, INVALID_CREDENTIALS_MESSAGE);
  }

  return { token: generateToken(credentials.user.id), user: credentials.user };
};

const getCurrentUser = async (userId) => {
  const user = await usersRepository.findById(userId);
  if (!user) {
    throw new AppError(404, 'Utilisateur introuvable');
  }
  return user;
};

module.exports = {
  verifyToken,
  login,
  getCurrentUser,
};
