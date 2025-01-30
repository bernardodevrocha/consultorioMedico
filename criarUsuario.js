const bcrypt = require('bcrypt');
const db = require('./config/db');

async function criarUsuario(username, password) {
  const senhaHash = await bcrypt.hash(password, 10);
  
  db.run('INSERT INTO users (username, password) VALUES (?, ?)', [username, senhaHash], (err) => {
    if (err) console.error('Erro ao criar usuário:', err);
    else console.log('Usuário criado com sucesso!');
    
    db.close(); // Fecha a conexão com o banco
  });
}

criarUsuario('admin', 'adminSenha');
