/**
 * JWT
 */

const jwt = require('jsonwebtoken');


const generarJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            uid
        };

        jwt.sign(payload, process.env.SECRET_SEED_JWT, {
            expiresIn: '4h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }

        });
    });

};

const generarClientJWT = (cid) => {

    return new Promise((resolve, reject) => {

        const payload = {
            cid
        };

        jwt.sign(payload, process.env.SECRET_SEED_JWT, {
            expiresIn: '72h'
        }, (err, token) => {

            if (err) {
                console.log(err);
                reject('No se pudo generar el token');
            } else {
                resolve(token);
            }

        });
    });

};

module.exports = {
    generarJWT,
    generarClientJWT
};