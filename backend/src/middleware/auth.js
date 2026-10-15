const AppError = require('../utils/AppError');
const authService = require('../services/auth.service');

// Vérifie le header "Authorization: Bearer <token>" et expose req.user
const authenticate = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');

  if (scheme !== 'Bearer' || !token) {
    return next(new AppError(401, 'Authentification requise'));
  }

  try {
    req.user = { id: authService.verifyToken(token) };
    return next();
  } catch (error) {
    return next(error);
  }
};

module.exports = authenticate;
