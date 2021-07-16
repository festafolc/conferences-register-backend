const { Op } = require("sequelize");
const { Participants } = require('../models/Participants');
const { Conferences } = require('../models/Conferences');
const { ConferencesParticipants } = require('../models/Conferences-Participants');
const { sendEmailToParticipant } = require("../helpers/sendEmailToParticipant");

const emailType = 'emailConfirmation';

const registerParticipant = async (req, res = response) => {

    const {nome, apelidos, email, instituicao} = req.body;

    const conferenceId = req.params.id;

  
    const conference = await Conferences.findByPk(
        conferenceId,
        {attributes: { exclude: ['organizadoreId'] }});


    if (!conference) {
        return res.status(400).json({
            ok: false,
            msg: 'Conferência nao existe com esse id',
        });
    }

    try {

        let participant = await Participants.findOne({where: {email}});
        if (participant) {

            const isAssociated = await ConferencesParticipants.findOne({
                where: {
                    [Op.and]: [
                        {conferencia_id: conferenceId},
                        {email: email}]
                }
            });

            if (isAssociated) {
                return res.status(400).json({
                    ok: false,
                    msg: 'Participante já está associado a esta conferência'
                });
            }

            let conf_part_Obj = {};
            conf_part_Obj['conferencia_id'] = conferenceId;
            conf_part_Obj['nome'] = nome;
            conf_part_Obj['apelidos'] = apelidos;
            conf_part_Obj['email'] = email;
            conf_part_Obj['instituicao'] = instituicao;

            const conference_participant = new ConferencesParticipants(conf_part_Obj);

            const newRegistration = await conference_participant.save();

            sendEmailToParticipant(email, nome, apelidos, conference, emailType);
            
            return res.status(201).json({
                ok: true,
                msg: 'Participante associado à conferência',
                newRegistration
            });
        }

        participant = new Participants(req.body);

        await participant.save();

        let conf_part_Obj = {};
        conf_part_Obj['conferencia_id'] = conferenceId;
        conf_part_Obj['nome'] = nome;
        conf_part_Obj['apelidos'] = apelidos;
        conf_part_Obj['email'] = email;
        conf_part_Obj['instituicao'] = instituicao;

        const conference_participant = new ConferencesParticipants(conf_part_Obj);

        const newRegistration = await conference_participant.save();

        sendEmailToParticipant(email, nome, apelidos, conference, emailType);

        res.status(201).json({
            ok: true,
            msg: 'Participante associado à conferência',
            nome,
            apelidos,
            email,
            instituicao,
            newRegistration
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}

module.exports = {registerParticipant}