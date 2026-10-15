import { getFullName } from './format';

export const ALL_FILIERES = 'Toutes';

// Filières distinctes, triées alphabétiquement
export function getFilieres(students) {
  return [...new Set(students.map((student) => student.filiere))].sort((a, b) =>
    a.localeCompare(b, 'fr'),
  );
}

export function filterByFiliere(students, filiere) {
  if (filiere === ALL_FILIERES) {
    return students;
  }
  return students.filter((student) => student.filiere === filiere);
}

export function getRecentStudents(students, limit) {
  return [...students]
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
    .slice(0, limit);
}

// Recherche insensible à la casse sur le prénom et le nom
export function filterByName(students, query) {
  const normalizedQuery = query.trim().toLocaleLowerCase('fr');
  if (!normalizedQuery) {
    return students;
  }
  return students.filter((student) =>
    getFullName(student).toLocaleLowerCase('fr').includes(normalizedQuery),
  );
}
