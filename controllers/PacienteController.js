const Paciente = require('../models/Pacientes');

const pacienteController = {
    listarPacientes: async (req, res) => {
        try{
            const pacientes = await Paciente.find();
            res.status(200).json(pacientes); 
        } catch(error){
            res.status(500).json({message: "Erro ao buscar pacientes ", error});
        }
    },

    buscarPacientes: async(req, res) => {
        const { id } = req.params;
        try{
            const paciente = await Paciente.findById(id);
            if(!paciente){
                return res.status(404).json({message: "Paciente não encontrado!"})
            }
            res.status(200).json(paciente);
        } catch(error){
            res.status(500).json({message: "Erro ao buscar paciente", error});
        }
    },

    criarPaciente: async(req, res) => {
        const {nome, cpf, dataNascimento, telefone, endereco} = req.body;
        try{
            const novoPaciente = new Paciente({nome, cpf, dataNascimento, telefone, endereco});
            await novoPaciente.save();
        } catch(error){
            res.status(500).json({message: "Erro ao criar Paciente", error});
        }
    },

    excluirPaciente: async (req, res) => {
        const { id } = req.params;
        try{
            const pacienteRemovido = await Paciente.findByIdAndDelete(id);
            if(!pacienteRemovido){
                return res.status(404).json({message: "Paciente não encontrado!"});
            }
            res.status(200).json({message: "Paciente removido com sucesso", paciente: pacienteRemovido });
        } catch(error){
            res.status(500).json({message: "Erro ao excluir paciente", error}); 
        }
    }
}

module.exports = pacienteController;