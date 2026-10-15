const asyncHandler = require('../utils/asyncHandler');
const studentsService = require('../services/students.service');

const list = asyncHandler(async (req, res) => {
  const students = await studentsService.listStudents();
  res.status(200).json(students);
});

const getById = asyncHandler(async (req, res) => {
  const student = await studentsService.getStudentById(Number(req.params.id));
  res.status(200).json(student);
});

const create = asyncHandler(async (req, res) => {
  const student = await studentsService.createStudent(req.body);
  res.status(201).json(student);
});

const remove = asyncHandler(async (req, res) => {
  await studentsService.deleteStudent(Number(req.params.id));
  res.status(204).end();
});

module.exports = {
  list,
  getById,
  create,
  remove,
};
