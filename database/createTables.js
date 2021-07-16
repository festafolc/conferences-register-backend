const {Organizers} = require('../models/Organizers');
const {Participants} = require('../models/Participants');
const {Conferences} = require('../models/Conferences');
const { ConferencesParticipants } = require('../models/Conferences-Participants');


const createTables = () => {
    Organizers.sync();
    Participants.sync();
    Conferences.sync();
    ConferencesParticipants.sync();
}


module.exports = {createTables}
