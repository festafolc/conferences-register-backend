const jwt = require('jsonwebtoken');


const generateJWT = (id, name) => {
    // Criar promesa para trabalhhar melhor dado que jwt nao trabalha com promesas
    return new Promise(( resolve, reject) => {
        const payload = {id, name};


        jwt.sign(payload, process.env.SECRET_JWT_SEED, {
            expiresIn: '2h'
        }, (error, token) => {
            if (error) {
                console.log(error);
                reject('Nao foi possível criar o token')
            }
            resolve(token);
        });
    });
}


module.exports = {
    generateJWT
}