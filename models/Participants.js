const db = require("../database/config");
const { Sequelize } = require('sequelize');


const Participants = db.define('participantes', {
    id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
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
        required: true,
        unique: true
    },
    instituicao: {
        type: Sequelize.STRING,
        allowNull: true
    }
});

module.exports = {Participants}