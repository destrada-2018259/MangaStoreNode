const {request, response} = require('express');
const jwt = require('jsonwebtoken')

const User = require('../models/user')

const validateJWT = async (req = request, res = response, next) =>{

    const token = req.header('x-token');

    if (!token) return res.status(401).send({
        msg: 'There is no token in the request headers.'
    })


    try{
        const {uid} = jwt.verify(token, process.env.SECRET_JWT_SEED);
        const user = await User.findById(uid)

        if(!user)
            return res.status(401).json({
                msg: 'User does not exist'
            })

        req.user = user;

        next();


    } catch (error){
        console.log(error);
        res.status(401).send({
            msg: 'Token is not valid.'
        })
    }
}

module.exports ={
    validateJWT
}