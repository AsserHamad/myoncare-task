const User = require('../models/user.model');

exports.getUser = async (req, res, next) => {
    const user = await User.findOne({id : req.params.id, attributes: {exclude: ['password', 'updatedAt']}});
    
    if(!user)
        return next({status: 404, message: 'This user does not exist'})
    
    res.json(user);
}

exports.getAllUsers = async (req, res, next) => {
    const users = await User.findAll({ attributes: {exclude: ['password', 'updatedAt']}});
    res.json(users);
}