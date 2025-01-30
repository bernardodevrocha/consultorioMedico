const sqlite3 = require('sqlite3');

const db = new sqlite3.Database('./config/database.db', (err) => {
  if(err) console.log('Erro ao conectar ao banco de dados: ', err);
  else console.log('Banco de dados Conectado com sucesso!');
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users(
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT
    )`);
})

module.exports = db;