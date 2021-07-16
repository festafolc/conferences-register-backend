const { Op } = require("sequelize");
const { sendEmailToParticipant } = require("../helpers/sendEmailToParticipant");
const { Conferences } = require("../models/Conferences");
const { ConferencesParticipants } = require("../models/Conferences-Participants");


const now = new Date();

const emailReminder = async (req, res) => {

    try {
        const conferences = await Conferences.findAll({
            where: {
                start : {
                    [Op.gte] : now
                }               
            }
        });


        conferences.map((c) => {
            checkEmailReminder(c.id, c.start);
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}


const checkEmailReminder = async (id, start, res) => {

    const emailType = 'emailReminder';

    try {
        const conference_participants = await ConferencesParticipants.findAll({
            where: {conferencia_id: id}
        });

        const conference = await Conferences.findByPk(
            id,
            {attributes: { exclude: ['organizadoreId']}});
        
        conference_participants.map((p) => {
            if ((start.getTime() - now.getTime()) < 244800000) {
                sendEmailToParticipant(p.email, p.nome, p.apelidos, conference, emailType);
            }
            // if (((start.getTime() - now.getTime()) <= 108000000) && ((start.getTime() - now.getTime()) > 21600000){ 30 horas == 108000000; cron daily at 16:00
            //     sendEmailToParticipant(e.email, e.nome, e.apelidos, conference.conferencia_id, emailType);
            // }
        });

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}


module.exports = {
    emailReminder
}