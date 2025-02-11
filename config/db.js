const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  database: 'consultoriomedico'
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