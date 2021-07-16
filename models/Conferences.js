const db = require("../database/config");
const { Sequelize } = require('sequelize');


const Conferences = db.define('conferencias', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    // FK que relaciona com o id da tabela Organizadores
    organizador_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        required: true
    },
    tema: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    },
    descricao: {
        type: Sequelize.STRING(2000),
        allowNull: false,
        required: true
    },
    sala: {
        type: Sequelize.STRING,
        allowNull: true
    },
    start: {
        type: Sequelize.DATE,
        allowNull: false,
        required: true
    },
    end: {
        type: Sequelize.DATE,
        allowNull: false,
        required: true
    },
    link: {
        type: Sequelize.STRING,
        allowNull: true
    }
});


module.exports = {Conferences}