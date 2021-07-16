const {response} = require('express');
const bcrypt = require('bcryptjs');
const { Organizers } = require('../models/Organizers');
const { generateJWT } = require('../helpers/jwt');


const loginOrganizer = async (req, res = response) => {

    const {email, password} = req.body;

    try {
        const organizador = await Organizers.findOne({where: {email}});
        console.log(organizador);

        if (!organizador) {
            return res.status(400).json({
                ok: false,
                msg: 'O organizador nao existe com esse email'
            });
        }

        // Confirmar passwords
        const validPassword = bcrypt.compareSync(password, organizador.password);

        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Password incorreta'
            });
        }

        // Criar JWT
        const token = await generateJWT(organizador.id, organizador.nome);

        res.status(200).json({
            ok: true,
            msg: 'login',
            id: organizador.id,
            nome: organizador.nome,
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}


const registerOrganizer = async (req, res = response) => {

    const {nome, apelidos, email, password} = req.body;

    try {
        let organizador = await Organizers.findOne({where: {email}});

        if (organizador) {
            return res.status(400).json({
                ok: false,
                msg: 'O organizador já existe com ese email'
            });
        }

        organizador = new Organizers(req.body);
        
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        organizador.password = bcrypt.hashSync(password, salt);

        await organizador.save();

        // Criar JWT
        const token = await generateJWT(organizador.id, organizador.nome);
    
        res.status(201).json({
            ok: true,
            msg: 'Organizador registado',
            id: organizador.id,
            nome,
            apelidos,
            email,
            token
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            msg: 'Por favor, fale com o administrador'
        });
    }
}


const renewToken = async (req, res = response) => {

    const {id, name} = req;

    // Criar JWT
    const token = await generateJWT(id, name);
    res.json({
        ok: true,
        msg: 'renew token',
        id,
        name,
        token
    })
}


module.exports = {
    loginOrganizer,
    registerOrganizer,
    renewToken
}