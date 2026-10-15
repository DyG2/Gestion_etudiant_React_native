const path = require('path');
const pool = require('../src/config/db');
const { listSqlFiles, readSqlFile } = require('./sqlFiles');

const SEEDS_DIR = path.join(__dirname, 'seeds');

const runSeed = async (file) => {
  const sql = await readSqlFile(SEEDS_DIR, file);
  const client = await pool.connect();
  try {
    await client.query(sql);
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  } finally {
    client.release();
  }
};

const seed = async () => {
  for (const file of await listSqlFiles(SEEDS_DIR)) {
    await runSeed(file);
    console.log(`Seed exécuté : ${file}`);
  }
};

seed()
  .catch((error) => {
    console.error('Échec du seed :', error.message);
    process.exitCode = 1;
  })
  .finally(() => pool.end());
