const fs = require('fs');

let db;

function getInstance() {
  if (!db) {
    const dbFile = fs.readFileSync('db/db.json');
    db = JSON.parse(dbFile);
    console.log({ db });
  }
  return db;
}

module.exports = {
  getInstance,
};
