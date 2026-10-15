const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const isBlank = (value) => value.trim().length === 0;

function validateEmail(email) {
  if (isBlank(email)) {
    return 'L’email est requis.';
  }
  if (!EMAIL_PATTERN.test(email.trim())) {
    return 'Le format de l’email est invalide.';
  }
  return null;
}

function validateRequired(value, message) {
  return isBlank(value) ? message : null;
}

// Ne conserve que les champs réellement en erreur
function compactErrors(errors) {
  return Object.fromEntries(Object.entries(errors).filter(([, message]) => message));
}

export function validateLogin({ email, password }) {
  return compactErrors({
    email: validateEmail(email),
    password: validateRequired(password, 'Le mot de passe est requis.'),
  });
}

export function validateStudent({ nom, prenom, email, filiere }) {
  return compactErrors({
    nom: validateRequired(nom, 'Le nom est requis.'),
    prenom: validateRequired(prenom, 'Le prénom est requis.'),
    email: validateEmail(email),
    filiere: validateRequired(filiere, 'La filière est requise.'),
  });
}

export function hasErrors(errors) {
  return Object.keys(errors).length > 0;
}
