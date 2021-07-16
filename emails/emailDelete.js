const { sendEmailToParticipant } = require("../helpers/sendEmailToParticipant");
const { Conferences } = require("../models/Conferences");
const { ConferencesParticipants } = require("../models/Conferences-Participants");


const emailDelete = async (id, res) => {

    const emailType = 'emailDelete';

    try {
        const conference_participants = await ConferencesParticipants.findAll({
            where: {conferencia_id: id},
            attributes: ['email', 'nome', 'apelidos'],
            raw: true
        });

        const conference = await Conferences.findByPk(
            id,
            {attributes: { exclude: ['organizadoreId'] }});


        conference_participants.map((p) => {
            sendEmailToParticipant(p.email, p.nome, p.apelidos, conference, emailType);
        });

        try {
            await ConferencesParticipants.destroy({
                where: {conferencia_id: id}
            });
            
        } catch (error) {
            console.log(error);
            res.status(500).json({
                ok: false,
                msg: 'Por favor, fale com o administrador'
            });
        }

    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}

module.exports = {
    emailDelete
}