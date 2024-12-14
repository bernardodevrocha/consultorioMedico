const express = require('express')
const app = express();
const path = require('path');
const bodyparser = require('body-parser');
const session = require('express-session');
const mysql = require('mysql2');

const Paciente = require('./models/Pacientes');
const pacienteRouter = require('./routes/pacienteRouter');

app.use(bodyparser.urlencoded({extended: true}));
app.use(bodyparser.json());
app.use(session({
    secret: 'ChaveNaConfigJson',
    resave: false,
    saveUninitialized: true
}));
app.use(express.static(path.join(__dirname, 'public')));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// As Rotas
app.use('/pacientes', pacienteRouter);
// app.use('/agendamentos', agendamentoRouter);
// app.use('/usuarios', usuarioRouter);

app.get('/', (req, res) => {
    if(req.session.user){
        res.render('menu', {user: req.session.user});
    } else{
        res.render('login');
        alert("Usuário ou senha incorretos!");
    }
})

app.use((req, res, next) => {
    res.status(400).render('404', {message: 'Página não encontrada'});
})

async function sincronizaBanco(){
    try{
        await Paciente.sync({alter: true});
        console.log("Tabela Pacientes sincronizada com sucesso!");
    } catch(error){
        console.log("Erro ao sincronizar a tabela: ", error);
    }
}

sincronizaBanco();

app.listen(3000, () => {
    console.log('Servidor conectado na porta 3000');
    console.log('http://localhost:3000');
})