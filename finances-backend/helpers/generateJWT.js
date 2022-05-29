
const jwt = require('jsonwebtoken');

const generateJWT = (id, email) => {
    return new Promise((resolve, reject) => {

        const payload = { id, email };
        const options = { expiresIn: '1d' };

        jwt.sign(
            payload,
            process.env.SECRET_JWT_SEED,
            options,
            (err, token) => {
                if(err) {
                    console.log(`Can't generate token for user ${email}`);
                    reject(err);
                }

                resolve(token);
            }
        );
    });
}

module.exports = {
    generateJWT
}