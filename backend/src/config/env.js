require('dotenv').config({ quiet: true });

const REQUIRED_VARIABLES = ['DATABASE_URL', 'JWT_SECRET', 'JWT_EXPIRES_IN'];

const missingVariables = REQUIRED_VARIABLES.filter((name) => !process.env[name]);

if (missingVariables.length > 0) {
  throw new Error(`Variables d'environnement manquantes : ${missingVariables.join(', ')}`);
}

module.exports = {
  databaseUrl: process.env.DATABASE_URL,
  jwtSecret: process.env.JWT_SECRET,
  jwtExpiresIn: process.env.JWT_EXPIRES_IN,
  port: Number(process.env.PORT) || 3000,
};
