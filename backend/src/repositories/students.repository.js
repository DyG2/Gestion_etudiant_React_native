const pool = require('../config/db');

const STUDENT_COLUMNS = 'id, nom, prenom, email, filiere, created_at';

const toStudent = (row) => ({
  id: row.id,
  nom: row.nom,
  prenom: row.prenom,
  email: row.email,
  filiere: row.filiere,
  createdAt: row.created_at,
});

const findAll = async () => {
  const { rows } = await pool.query(`SELECT ${STUDENT_COLUMNS} FROM students ORDER BY id`);
  return rows.map(toStudent);
};

const findById = async (id) => {
  const { rows } = await pool.query(
    `SELECT ${STUDENT_COLUMNS} FROM students WHERE id = $1`,
    [id],
  );
  return rows[0] ? toStudent(rows[0]) : null;
};

const create = async ({ nom, prenom, email, filiere }) => {
  const { rows } = await pool.query(
    `INSERT INTO students (nom, prenom, email, filiere)
     VALUES ($1, $2, $3, $4)
     RETURNING ${STUDENT_COLUMNS}`,
    [nom, prenom, email, filiere],
  );
  return toStudent(rows[0]);
};

// Renvoie true si une ligne a été supprimée
const deleteById = async (id) => {
  const { rowCount } = await pool.query('DELETE FROM students WHERE id = $1', [id]);
  return rowCount > 0;
};

module.exports = {
  findAll,
  findById,
  create,
  deleteById,
};
