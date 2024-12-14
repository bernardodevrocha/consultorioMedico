const { DataTypes } = require('sequelize');
const sequelize = require('../config/dataBase');

const Paciente = sequelize.define('Paciente', {
    id:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    cpf: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },
    dataNascimento:{
        type: DataTypes.DATEONLY,
        allowNull:false
    },
    telefone: {
        type: DataTypes.STRING(15)
    },
    endereco: {
        type: DataTypes.STRING(300)
    }
}, {
    tableName: 'Pacientes',
    timeStamp: true
})

module.exports = Paciente;