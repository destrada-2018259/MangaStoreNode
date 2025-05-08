const {request, respoonse} = require('express');
const User = require ('../models/user')
const bcryptjs = require('bcryptjs')
const {generateJWT} = require('../helpers/generate-jwt')

const login = async(req = request, res = response) =>{
    const {email, password} = req.body

    try {
        const user = await User.findOne({email});

        if(!user)
            return res.status(400).send({
                msg: 'Invalid email.'
            })
        if (!user){
            return res.status(202).json({
                msg: 'User not found'
            })
        }
        if (!bcryptjs.compareSync(password, user.password))
            return res.status(400).send({
                msg:'Password is incorrect'
            })

        const token = await generateJWT(user.id);

        res.send({
            msg:'Login succeded',
            user,
            token
        })


    } catch (error) {
        console.log(error)
        res.status(500).json({
            msg: 'Something went wrong, call the admin.'
        })
        
    }
}

module.exports = {
    login
}