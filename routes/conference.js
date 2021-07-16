/*
Conferences Routes
/api/conferencias_autonoma
*/

const {Router} = require('express');
const {check} = require('express-validator');
const {getConferences, createConference, updateConference, deleteConference, downloadConference} = require("../controllers/conference.js");
const {validateJWT} = require('../middlewares/validate-jwt');
const {validateFields} = require('../middlewares/field-validators');
const {isDate} = require('../helpers/isDate')



const router = Router();
// Validaçao de todas as rotas com tokens
router.use(validateJWT);

// Endpoints
router.get('/', getConferences);


router.post(
    '/',
    [ // middlewares
        check('tema', 'O tema é obrigatório').not().isEmpty(),
        check('descricao', 'A descriçao é obrigatória').not().isEmpty(),
        check('sala', 'A sala é obrigatória').not().isEmpty(),
        check('start', 'A dataInicio é obrigatória').custom(isDate),
        check('end', 'A dataFim é obrigatória').custom(isDate),
        validateFields
    ],
    createConference);


router.put('/:id',
    [ // middlewares
        check('tema', 'O tema é obrigatório').not().isEmpty(),
        check('descricao', 'A descriçao é obrigatória').not().isEmpty(),
        check('sala', 'A sala é obrigatória').not().isEmpty(),
        check('start', 'A dataInicio é obrigatória').custom(isDate),
        check('end', 'A dataFim é obrigatória').custom(isDate),
        validateFields
    ],
    updateConference);


router.delete('/:id', deleteConference);


router.get('/:id', downloadConference);

module.exports = router;