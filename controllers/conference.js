const { response } = require("express");
const { Op } = require("sequelize");
const { emailDelete } = require("../emails/emailDelete");
const { emailUpdate } = require("../emails/emailUpdate");
const { Conferences } = require("../models/Conferences");
const { ConferencesParticipants} = require("../models/Conferences-Participants");


const getConferencesWithoutToken = async (req, res = response) => {

    try {

        const now = new Date();

        const conferences = await Conferences.findAll({
            where: {
                start : {
                    [Op.gte] : now
                }               
            },
            order: ['start']
        });
        res.status(201).json({
            ok: true,
            msg: 'getConferencesWithoutToken',
            conferences
        });
    
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}

const getConferences = async (req, res = response) => {

    const organizador_id = req.id;
    const superuser = req.name;

    try {
        if (superuser === 'Admin') {
            
            const conferences = await Conferences.findAll();
            res.status(201).json({
                ok: true,
                msg: 'getConferences para superuser',
                conferences
            });
        } else {
            const conferences = await Conferences.findAll({
                attributes: { exclude: ['organizadoreId'] },
                where: {organizador_id}
            });

            res.status(201).json({
                ok: true,
                msg: 'getConferences',
                conferences
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



const createConference = async (req, res = response) => {

    try {

        const conference = new Conferences(req.body);
        
        // Pega o id do organizador que está a fazer o Create para associar com a FK
        conference.organizador_id = req.id;

        const newConference = await conference.save();

        res.status(201).json({
            ok: true,
            msg: 'registo de conferência',
            conference: newConference
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}


const updateConference = async (req, res = response) => {

    const id = req.params.id;
    const organizador_id = req.id;
    const superuser = req.name

    try {
        const conference = await Conferences.findByPk(
            id,
            {attributes: { exclude: ['organizadoreId'] }});

        if (!conference) {
            return res.status(400).json({
                ok: false,
                msg: 'Conferência nao existe com esse id',
            });
        }


        if (superuser === 'Admin') {
            const newConference = {
                ...req.body,
            }
    
            await Conferences.update(
                newConference,
                {where: {id}}); 
                
                try {
                    emailUpdate(id);
                    
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        ok: false,
                        msg: 'Por favor, fale com o administrador'
                    });
                }
            return res.status(201).json({
                ok: true,
                msg: 'Conferencia Autalizada',
                conferencia: newConference
            });
        } else if (conference.organizador_id !== organizador_id) {
            return res.status(404).json({
                ok: false,
                msg: 'Nao tem permissao para editar esta conferência'
            });

        } else {
            const newConference = {
                ...req.body,
            }
    
            await Conferences.update(
                newConference,
                {where: {id}}); 
                
                try {
                    emailUpdate(id);
                    
                } catch (error) {
                    console.log(error);
                    res.status(500).json({
                        ok: false,
                        msg: 'Por favor, fale com o administrador'
                    });
                }
            return res.status(201).json({
                ok: true,
                msg: 'Conferencia Autalizada',
                conferencia: newConference
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


const deleteConference = async (req, res = response) => {

    const id = req.params.id;
    const organizador_id = req.id;
    const superuser = req.name;

    try {

        const conference = await Conferences.findByPk(
            id,
            {attributes: { exclude: ['organizadoreId'] }});

        if (!conference) {
            return res.status(400).json({
                ok: false,
                msg: 'Conferência nao existe com esse id',
            });
        }

        if (superuser === 'Admin') {
            try {
                emailDelete(id);
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Por favor, fale com o administrador'
                });
            }
            
            await conference.destroy();
    
            return res.status(201).json({
                ok: true,
                msg: 'Conferencia eliminada'
            });
        } else if (conference.organizador_id !== organizador_id) {
            return res.status(404).json({
                ok: false,
                msg: 'Nao tem permissao para apagar esta conferência'
            });

        } else {
            try {
                emailDelete(id);
                
            } catch (error) {
                console.log(error);
                return res.status(500).json({
                    ok: false,
                    msg: 'Por favor, fale com o administrador'
                });
            }
            
            await conference.destroy();
    
            return res.status(201).json({
                ok: true,
                msg: 'Conferencia eliminada'
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


const downloadConference = async (req, res = response) => {

    const id = req.params.id;
    const organizador_id = req.id;
    const superuser = req.name;

    try {
        const conference = await Conferences.findByPk(
            id,
            {attributes: { exclude: ['organizadoreId'] }});

        if (!conference) {
            return res.status(400).json({
                ok: false,
                msg: 'Conferência nao existe com esse id',
            });
        }

        if (superuser === 'Admin') {
            const conference_participants = await ConferencesParticipants.findAll({
                where: {conferencia_id: id}
            });
        
            return res.status(201).json({
                ok: true,
                msg: 'getConferencesParticipants',
                conference_participants,
                
            });
        } else if (conference.organizador_id !== organizador_id) {
            return res.status(404).json({
                ok: false,
                msg: 'Nao tem permissao para descarregar esta conferência'
            });
        } else {
            const conference_participants = await ConferencesParticipants.findAll({
                where: {conferencia_id: id}
            });
        
            return res.status(201).json({
                ok: true,
                msg: 'getConferencesParticipants',
                conference_participants,
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
    getConferences,
    createConference,
    updateConference,
    deleteConference,
    downloadConference,
    getConferencesWithoutToken
}