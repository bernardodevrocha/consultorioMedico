const {DataTypes} = require('sequelize');
const sequelize = require('../config/dataBase');

const Usuario = sequelize.define('Usuario', {
    idUsuario: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },

    nomeCompleto: {
        type: DataTypes.STRING(255),
        allowNull: false
    },

    email: {
        type: DataTypes.STRING(150),
        allowNull: false
    },

    username: {
        type: DataTypes.STRING(150),
        allowNull: false,
        unique: true
    },

    senha: {
        type: DataTypes.STRING(150),
        allowNull: false,
    },

    createdAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
    },

    updatedAt: {
        type: DataTypes.DATE,
        allowNull: true,
        defaultValue: DataTypes.NOW,
        onUpdate: DataTypes.NOW,
    },
})

module.exports = Usuario;