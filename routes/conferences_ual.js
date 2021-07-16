/*
Conferencias_ual Routes
/api/conferencias_ual/conferencias
*/

const {Router} = require('express');
const {getConferencesWithoutToken} = require("../controllers/conference.js");

const router = Router();

router.get('/', getConferencesWithoutToken);

module.exports = router;