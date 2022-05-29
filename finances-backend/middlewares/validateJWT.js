const { response } = require('express');
const jwt = require('jsonwebtoken');




const validateJWT = (req, res = response, next) => {
    const token = req.header('x-token');

    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'No token provided'
        })
    }
  
    try {

        const { id, name } = jwt.verify(token, process.env.SECRET_JWT_SEED);

        req.id = id;
        req.name = name;

    } catch(err) {
        console.log(err);
        return res.status(500).json({
            ok: false,
            msg: 'Error no token'
        });
    }

    next();
}

module.exports = {
    validateJWT
}