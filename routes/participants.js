/*
Participants Routes
/api/conferencias_ual/inscricao
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {validateFields} = require('../middlewares/field-validators');
const {registerParticipant} = require('../controllers/participants');


const router = Router();


//Endpoints
router.post(
    '/:id',
    [ // middleware
        check('nome', 'O nome é obrigatório').not().isEmpty(),
        check('apelidos', 'O apelido é obrigatório').not().isEmpty(),
        check('email', 'Insira um correio eletrônico válido').isEmail(),
        validateFields
    ],
    registerParticipant
    );


module.exports = router;