const AppError = require('../utils/AppError');

// Express reconnaît un gestionnaire d'erreurs à ses 4 paramètres, next compris
const errorHandler = (err, req, res, next) => {
  if (err instanceof AppError) {
    return res.status(err.statusCode).json({ message: err.message });
  }

  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'Corps de requête JSON invalide' });
  }

  // Erreur inattendue : on la journalise sans exposer les détails au client
  console.error(err);
  return res.status(500).json({ message: 'Erreur interne du serveur' });
};

module.exports = errorHandler;
