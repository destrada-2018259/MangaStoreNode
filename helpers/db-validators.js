const User = require('../models/user');

const userExists = async (id) =>{
    const user = await User.findById(id);
    if (!user) {
        throw new Error(`User with id ${id} does not exist`);
    }
}

module.exports = {
    userExists
}