const sequelize = require('../config/dataBase');
const Paciente = require('./Pacientes');
const Usuario = require('./Usuario');

// Associações (caso haja relacionamentos entre tabelas)
// Exemplo: Medico.hasMany(Paciente);

module.exports = {
    sequelize,
    Paciente,
    Usuario,
};
