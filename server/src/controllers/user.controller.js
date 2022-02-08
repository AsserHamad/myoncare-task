const User = require('../models/user.model');
const {catchAsyncErrors} = require('../utils/catch-async-errors');

exports.getUser = catchAsyncErrors(async (req, res, next) => {
    const user = await User.findOne({where: {id : req.params.id}, attributes: {exclude: ['password', 'updatedAt']}});
    
    if(!user)
        return next({status: 404, message: 'This user does not exist'})
    
    res.json(user);
})

exports.getAllUsers = catchAsyncErrors(async (req, res, next) => {
    const users = await User.findAll({ attributes: {exclude: ['password', 'updatedAt']}});
    res.json(users);
});

exports.updateUser = catchAsyncErrors(async (req, res, next) => {
    const id = req.params.id;
    const [usersAffected] = await User.update(req.body, {where: {id}});
    if(!usersAffected)
        return next({status: 404, message: 'This user does not exist'});

    res.sendStatus(200);
});

exports.deleteUser = catchAsyncErrors(async (req, res, next) => {
    await User.destroy({where: {id: req.params.id}});
    res.sendStatus(200);
})