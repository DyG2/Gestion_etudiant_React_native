const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MAX_POSTGRES_INTEGER = 2147483647;

const isNonEmptyString = (value) => typeof value === 'string' && value.trim().length > 0;

const isEmail = (value) => isNonEmptyString(value) && EMAIL_PATTERN.test(value.trim());

const isPositiveInteger = (value) =>
  /^[1-9]\d*$/.test(String(value)) && Number(value) <= MAX_POSTGRES_INTEGER;

// Chaque schéma associe une source de la requête (body, params) à des règles par champ
const loginSchema = {
  body: {
    email: { check: isEmail, message: 'Email invalide' },
    password: { check: isNonEmptyString, message: 'Le mot de passe est requis' },
  },
};

const createStudentSchema = {
  body: {
    nom: { check: isNonEmptyString, message: 'Le nom est requis' },
    prenom: { check: isNonEmptyString, message: 'Le prénom est requis' },
    email: { check: isEmail, message: 'Email invalide' },
    filiere: { check: isNonEmptyString, message: 'La filière est requise' },
  },
};

const studentIdSchema = {
  params: {
    id: { check: isPositiveInteger, message: 'Identifiant invalide' },
  },
};

module.exports = {
  loginSchema,
  createStudentSchema,
  studentIdSchema,
};
