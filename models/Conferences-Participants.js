const db = require("../database/config");
const { Sequelize } = require('sequelize');


const ConferencesParticipants = db.define('conferencias_participantes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    conferencia_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true

    },
    nome: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    apelidos: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    instituicao: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = {ConferencesParticipants}