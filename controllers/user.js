const {response, request} = require('express');
const bcryptjs = require ('bcryptjs');

const User = require('../models/user');

const getUsers = async (req = request, res = response) =>{
    const query = {status: true};

    const users = await Promise.all([
        User.countDocuments(query),
        User.find(query)
    ]);

    res.json({
        msg: 'Users Found',
        users
    })
}

const postUser = async(req = request, res = response) =>{
    const {name, email, password, role} = req.body;

    const userDB = new User({name, email, password, role});

    const salt = bcryptjs.genSaltSync();
    userDB.password = bcryptjs.hashSync(password, salt);

    await userDB.save();

    res.status(201).json({
        msg: 'User created successfully',
        userDB
    })
}

const putUser = async (req = request, res = response) =>{
    const {id} = req.params;
    const {_id, status, role, ...data} = req.body;

    const salt = bcryptjs.genSaltSync();
    data.password = bcryptjs.hashSync(data.password, salt);

    const updatedUser = await User.findByIdAndUpdate(id, data);

    res.json({
        msg: 'User updated successfully',
        updatedUser
    })
}


const deleteUser = async(req = request, res = response) =>{
    const {id} = req.params;

    const deletedUser = await User.findByIdAndDelete(id);
    res.json({
        msg: 'User deleted successfully',
        deletedUser
    })
}

const signUp = async (req = request, res = response) =>{
    const {name, email, password} = req.body;
    const registeredUser = new User({name, email, password});
    const salt = bcryptjs.genSaltSync();

    registeredUser.password = bcryptjs.hashSync(password, salt);

    res.status(201).json({
        msg: 'New user registered',
        registeredUser
    })
}

const updateAccount = async (req = request, res = response) =>{
    const {id} = req.params;
    const userId = req.user._id;

    if(id === userId){
        const {_id, status, role, ...data} = req.body;
        const salt = bcryptjs.genSaltSync();
        data.password = bcryptjs.hashSync(data.password, salt);

        const updatedUser = await Usuario.findByIdAndUpdate(id, data);

        res.json({
            msg: 'User updated',
            updatedUser
        })
    } else{
        return res.status(400).json({
            msg: 'You can only update your own account'
        })
    }
}

const deleteAccount = async (req = request, res = response) =>{
    const {id} = req.params;
    const userId = req.user._id;

    if(id === userId){
        const deletedUser = await User.FindByIdAndDelete(id);
        res.json({
            msg: 'User deleted',
            deletedUser
        })
    } else{
        return res.status(400).json({
            msg: 'You can only delete your own account'
        })
    }
}

module.exports ={
    getUsers,
    postUser,
    putUser,
    deleteUser,
    signUp,
    updateAccount,
    deleteAccount
}