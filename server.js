const express = require('express');
const session = require('express-session');
const bcrypt = require('bcrypt');
const db = require('./config/db');
const path = require('path');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
  secret: 'palavra-secreta',
  resave: false,
  saveUnitialized: false
}));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('login', {erro: null});
});

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
    if(err) return res.status(500).send('Erro no servidor');
    if(!user) return res.render('login', {erro: 'Usuário não encontrado'});

    const senhaCorreta = await bcrypt.compare(password, user.password);
    if(!senhaCorreta) return res.render('login', {erro: user.username});

    req.session.user = {id: user.id, username: user.username};
    return res.redirect('/menu');
  });
});

function seeAuthentication(req, res, next){
  if(!req.session.user) return res.redirect('/');
  next();
}

app.get('/menu', seeAuthentication ,(req, res) => {
  res.render('menu', { username: req.session.user.username });
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => {
    res.redirect('/');
  });
})

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
  console.log('http://localhost:3000');
})