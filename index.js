const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./database/config');
const { createTables } = require('./database/createTables');
const cron = require('node-cron');
const { emailReminder } = require('./emails/emailReminder');


// Crear o servidor de Express
const app = express();

// Base de Dados
db.authenticate()
    .then(() => console.log('Conectado à Base de Dados'))
    .then(createTables())
    .catch(error => console.log(error));


app.use(cors());

// Diretório público
app.use(express.static('public'));

// Leitura e parseio do body
app.use(express.json());


// Rotas
app.use('/api/auth', require('./routes/auth'));
app.use('/api/conferencias_autonoma', require('./routes/conference'));
app.use('/api/conferencias_ual/conferencias', require('./routes/conferences_ual'));
app.use('/api/conferencias_ual/inscricao', require('./routes/participants'));


// Cron
cron.schedule('* * * * *', () => {
    emailReminder();
});
// cron.schedule('* 16 * * *', () => { // Todos os dias às 16:00
//     emailReminder();
// });

// Escutar solicitaçoes
app.listen(process.env.PORT, () => {
    console.log(`Servidor correndo no porto ${process.env.PORT}`);
});

