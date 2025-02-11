const express = require('express');
const app = express();
const path = require('path');
const db = require('./config/db');

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('index');
});

app.post('/', (req, res) => {
  const botao = req.body.botao;

  switch(botao){
    case "agendamentos":
      res.redirect('/agendamentos');
      break;
    case "pacientes":
      res.redirect('/pacientes')
      break;
    case "medicos":
      res.redirect('/medicos');
      break;
    case "prontuarios":
      res.redirect('/prontuarios');
      break;
    case "configuracoes":
      res.redirect('/configuracoes');
      break;
    default:
      res.status(500).send("opção inválida");
  }
})

app.get('/agendamentos', (req, res) => {
  const query = `select consulta.idConsulta,
                pacientes.nomeCompleto as paciente,
                medico.nomeCompleto as medico,
                consulta.dataConsulta
                from consulta
                join pacientes on consulta.idPacientes = pacientes.idPacientes
                join medico on consulta.idMedico = medico.idMedico;
     `;

  db.query(query, (err, result) => {
    if (err) {
      console.error("Erro ao buscar pacientes:", err.message);
      return res.status(500).send('Erro ao buscar dados');
    }

    res.render("agendamentos", { query: result });
  });
});


app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
});