import { http } from './http';

const STUDENTS_PATH = '/students';

const studentPath = (id) => `${STUDENTS_PATH}/${encodeURIComponent(id)}`;

export function getStudents() {
  return http.get(STUDENTS_PATH);
}

export function getStudentById(id) {
  return http.get(studentPath(id));
}

export function createStudent(student) {
  return http.post(STUDENTS_PATH, student);
}

export function deleteStudent(id) {
  return http.delete(studentPath(id));
}
