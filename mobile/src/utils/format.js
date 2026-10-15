export function getFullName(student) {
  return `${student.prenom} ${student.nom}`;
}

export function formatDate(isoDate) {
  return new Date(isoDate).toLocaleDateString('fr-FR', {
    day: '2-digit',
    month: 'long',
    year: 'numeric',
  });
}
