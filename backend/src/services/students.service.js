const AppError = require('../utils/AppError');
const studentsRepository = require('../repositories/students.repository');

const PG_UNIQUE_VIOLATION = '23505';

const listStudents = () => studentsRepository.findAll();

const getStudentById = async (id) => {
  const student = await studentsRepository.findById(id);
  if (!student) {
    throw new AppError(404, 'Étudiant introuvable');
  }
  return student;
};

const createStudent = async ({ nom, prenom, email, filiere }) => {
  try {
    return await studentsRepository.create({
      nom: nom.trim(),
      prenom: prenom.trim(),
      email: email.trim().toLowerCase(),
      filiere: filiere.trim(),
    });
  } catch (error) {
    if (error.code === PG_UNIQUE_VIOLATION) {
      throw new AppError(409, 'Un étudiant avec cet email existe déjà');
    }
    throw error;
  }
};

const deleteStudent = async (id) => {
  const isDeleted = await studentsRepository.deleteById(id);
  if (!isDeleted) {
    throw new AppError(404, 'Étudiant introuvable');
  }
};

module.exports = {
  listStudents,
  getStudentById,
  createStudent,
  deleteStudent,
};
