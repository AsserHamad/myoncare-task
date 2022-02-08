const User = require('../models/user.model');
const { generateTokenAsync } = require('../utils/token');
const { catchAsyncErrors } = require('../utils/catch-async-errors');
const {first, last} = require('random-name');

exports.register = catchAsyncErrors(async (req, res, next) => {
    const name = `${first()} ${last()}`;
    const user = await User.create({...req.body, name});
    const accessToken = await generateTokenAsync(user.toJSON());
    res.json({user, accessToken});
});


exports.login = catchAsyncErrors(async (req, res, next) => {
    const {email, password} = req.body;
    const user = await User.findOne({where: {email}});
    if(!user)
        return next({status: 404, message: 'Invalid credentials'});
    
    const sameUser = await user.comparePassword(password, user.getDataValue('password'));
    if(!sameUser)
        return next({status: 404, message: 'Invalid credentials'});
    
    const jsonUser = user.toJSON();
    delete jsonUser.password;
    delete jsonUser.updatedAt;
    
    const accessToken = await generateTokenAsync(jsonUser);
    res.json({user : jsonUser, accessToken});
});

exports.verifyAccessToken = catchAsyncErrors(async (req, res, next) => {
    res.json(req.user);
})