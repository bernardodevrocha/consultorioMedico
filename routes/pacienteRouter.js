const express = require('express');
const router = express.Router();
const pacienteController = require('../controllers/PacienteController');

// Listar todos os pacientes
router.get('/listar', pacienteController.listarPacientes);

// Buscar um paciente específico
router.get('/detalhes/:id', pacienteController.buscarPacientes);

// Criar um novo paciente (formulário)
router.get('/novo', (req, res) => {
    res.render('pacientes/novo');
});

// Criar um novo paciente (salvar no banco)
router.post('/novo', pacienteController.criarPaciente);

// Atualizar um paciente (formulário)
router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const paciente = await Paciente.findByPk(id);
        if (!paciente) {
            return res.status(404).send('Paciente não encontrado');
        }
        res.render('pacientes/editar', { paciente });
    } catch (error) {
        res.status(500).send('Erro ao buscar paciente para edição: ' + error.message);
    }
});

// Atualizar um paciente (salvar alterações)
router.post('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const { nome, cpf, dataNascimento, telefone, endereco } = req.body;
    try {
        await Paciente.update({ nome, cpf, dataNascimento, telefone, endereco }, { where: { id } });
        res.redirect('/pacientes/listar');
    } catch (error) {
        res.status(500).send('Erro ao atualizar paciente: ' + error.message);
    }
});

// Excluir um paciente
router.post('/excluir/:id', pacienteController.excluirPaciente);

module.exports = router;
