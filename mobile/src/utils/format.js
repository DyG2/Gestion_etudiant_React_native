export function getFullName(student) {
  return `${student.prenom} ${student.nom}`;
}

// Initiales des deux premiers mots : « Jean Rakoto » → « JR »
export function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((word) => word.charAt(0).toUpperCase())
    .join('');
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
