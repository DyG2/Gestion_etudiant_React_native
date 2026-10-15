const path = require('path');
const pool = require('../src/config/db');
const { listSqlFiles, readSqlFile } = require('./sqlFiles');

const MIGRATIONS_DIR = path.join(__dirname, 'migrations');

const ensureMigrationsTable = () =>
  pool.query(`
    CREATE TABLE IF NOT EXISTS schema_migrations (
      filename VARCHAR(255) PRIMARY KEY,
      applied_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
    )
  `);

const getAppliedMigrations = async () => {
  const { rows } = await pool.query('SELECT filename FROM schema_migrations');
  return new Set(rows.map((row) => row.filename));
};

const applyMigration = async (file) => {
  const sql = await readSqlFile(MIGRATIONS_DIR, file);
  const client = await pool.connect();
  try {
    await client.query(sql);
    await client.query('INSERT INTO schema_migrations (filename) VALUES ($1)', [file]);
  } catch (error) {
    // Annule la transaction ouverte par le script en cas d'échec
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const migrate = async () => {
  await ensureMigrationsTable();
  const applied = await getAppliedMigrations();
  const pending = (await listSqlFiles(MIGRATIONS_DIR)).filter((file) => !applied.has(file));

  if (pending.length === 0) {
    console.log('Aucune migration à appliquer.');
    return;
  }

  for (const file of pending) {
    await applyMigration(file);
    console.log(`Migration appliquée : ${file}`);
  }
};

migrate()
  .catch((error) => {
    console.error('Échec de la migration :', error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
