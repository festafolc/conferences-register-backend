const {response} = require('express');
const jwt = require('jsonwebtoken');

const validateJWT =  (req, res = response, next) => {
    
    // x-token headers
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'Nao existe token'
        });
    }

    try {
        const {id, name} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        
        req.id = id;
        req.name = name;
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token nao válido'
        })
    }

    next();
}

module.exports = {
    validateJWT
}