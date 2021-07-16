const db = require("../database/config");
const { Sequelize } = require('sequelize');


const Organizers = db.define('organizadores', {
    id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true
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
    password: {
        type: Sequelize.STRING,
        allowNull: false,
        required: true
    }
});


module.exports = {Organizers}