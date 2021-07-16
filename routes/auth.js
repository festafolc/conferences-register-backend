/*
    Rotas de Usuários / Auth
    host + /api/auth
 */

const {Router} = require('express');
const {check} = require('express-validator');

const {validateFields} = require('../middlewares/field-validators');
const {loginOrganizer, registerOrganizer, renewToken} = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validate-jwt');


const router = Router();

// Endpoints
router.post(
    '/',
    [ // middlewares
        check('email', 'Insira um correio eletrônico válido').isEmail(),
        check('password', 'A password é obrigatória').not().isEmpty(),
        validateFields
    ],
    loginOrganizer);


router.post(
    '/register',
    [ // middlewares
        check('nome', 'O nome é obrigatório').not().isEmpty(),
        check('apelidos', 'O apelido é obrigatório').not().isEmpty(),
        check('email', 'O email é obrigatório').isEmail(),
        check('password', 'O pasword deve ter no mínimo 8').isLength({min: 8}),
        validateFields
    ],
    registerOrganizer);

    
router.get('/renew', validateJWT, renewToken);


module.exports = router;