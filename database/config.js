const { Sequelize } = require('sequelize');


module.exports = new Sequelize('conferencias_ual', 'root', 'Projeto2021UAL!', {
    host: 'localhost',
    dialect: 'mysql'
});
