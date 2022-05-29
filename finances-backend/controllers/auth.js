
const { response } = require('express');
const bcrypt = require('bcryptjs');
const User = require('../models/User');
const { generateJWT } = require('../helpers/generateJWT');

const register = async (req, res =  response) => {

    const { email, password } = req.body;

    try {

        let user = await User.findOne({ email });
        if(user) {
            return res.status(400).json({
                ok: false,
                msg: 'Email already registered'
            })
        }

        user = new User(req.body);

        //encrypt pwd
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        //save
        await user.save();

        //generate token
        const token = await generateJWT(user.id, user.name);

        res.status(201).json({
            ok: true,
            id: user.id,
            email: user.email,
            token
        });


    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error in register'
        });
    }

}

const login = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const user = await User.findOne({ email });
    
        if(!user) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid credentials'
            })
        }

        //confirm password
        const validPassword = bcrypt.compareSync(password, user.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: 'Invalid credentials'
            })
        }

        //generate token
        const token = await generateJWT(user.id, user.email);

        res.status(200).json({
            ok: true,
            id: user.id,
            email: user.email,
            token
        });

    } catch(err) {
        console.log(err);
        res.status(500).json({
            ok: false,
            msg: 'Error in login'
        });
    }
}

const renewToken = async (req, res = response) => {

    const { id, email } = req;
   
    const token = await generateJWT(id, email);

    res.json({
        ok: true,
        id,
        email,
        token
    });

}

module.exports = {
    register,
    login,
    renewToken
}