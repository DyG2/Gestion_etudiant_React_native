const AppError = require('../utils/AppError');

// Applique un schéma de validation (voir utils/validators.js) et s'arrête à la première erreur
const validate = (schema) => (req, res, next) => {
  for (const [source, rules] of Object.entries(schema)) {
    const data = req[source] || {};

    for (const [field, { check, message }] of Object.entries(rules)) {
      if (!check(data[field])) {
        return next(new AppError(400, message));
      }
    }
  }

  return next();
};

module.exports = validate;
