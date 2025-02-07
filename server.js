const express = require('express');
const app = express();
const path = require('path');

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
  const agendamentos = [
    { paciente: "João Silva", medico: "Dr. Pedro", data: "2025-02-10", horario: "14:00" },
    { paciente: "Maria Oliveira", medico: "Dra. Ana", data: "2025-02-11", horario: "10:30" }
  ];
  
  res.render("agendamentos", {agendamentos});
})

app.listen(3000, () => {
  console.log('Servidor rodando em http://localhost:3000');
})