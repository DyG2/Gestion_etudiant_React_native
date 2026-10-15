const fs = require('fs/promises');
const path = require('path');

// Renvoie les fichiers .sql d'un dossier, triés par nom (donc par numéro)
const listSqlFiles = async (directory) => {
  const files = await fs.readdir(directory);
  return files.filter((file) => file.endsWith('.sql')).sort();
};

const readSqlFile = (directory, file) => fs.readFile(path.join(directory, file), 'utf8');

module.exports = { listSqlFiles, readSqlFile };
