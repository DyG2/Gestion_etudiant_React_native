const pool = require('../config/db');

const toUser = (row) => ({
  id: row.id,
  email: row.email,
  nom: row.nom,
  createdAt: row.created_at,
});

const findById = async (id) => {
  const { rows } = await pool.query(
    'SELECT id, email, nom, created_at FROM users WHERE id = $1',
    [id],
  );
  return rows[0] ? toUser(rows[0]) : null;
};

// Seule fonction qui expose le hash, séparé de l'utilisateur public
const findCredentialsByEmail = async (email) => {
  const { rows } = await pool.query(
    'SELECT id, email, nom, created_at, password_hash FROM users WHERE email = $1',
    [email],
  );
  return rows[0] ? { user: toUser(rows[0]), passwordHash: rows[0].password_hash } : null;
};

module.exports = {
  findById,
  findCredentialsByEmail,
};
