

const { Router } = require('express');
const { register, login, renewToken } = require('../controllers/auth');
const { validateJWT } = require('../middlewares/validateJWT');

const router = Router();


router.post('/login', login)

router.post('/register', register);

router.get('/renew-token', validateJWT, renewToken);

router.get('/recover-password', () => {
    console.log('recover-password');
})

module.exports = router;