const fs = require('fs');

const dbPath = 'src/db/db.json';
let db;

function getInstance() {
  if (!db) {
    const dbFile = fs.readFileSync(dbPath);
    db = JSON.parse(dbFile);
  }
  return db;
}

function saveData(data) {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
}

module.exports = {
  dbPath,
  getInstance,
  saveData,
};
