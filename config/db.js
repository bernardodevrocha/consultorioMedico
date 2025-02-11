require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

connection.connect((err) => {
  if(err){
    console.error('Erro ao conectar o MySQL: ', err.message);
    return;
  }
  console.log('Conectado ao Mysql com sucesso');
});

process.on('SIGINT', () => {
  connection.end(() => {
    console.log('Conexão com MySQL encerrada.');
    process.exit(0);
  });
});

module.exports = connection;