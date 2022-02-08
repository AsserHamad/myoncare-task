const { verifyTokenAsync } = require("../utils/token");
const User = require('../models/user.model');

exports.isAuthenticated = async (req, res, next) => {
    let token = req.headers.authorization;

    if(!token)
        return next({status: 400, message: 'You are not logged in!'});

    token = token.replace('Bearer ', '');
    try {
        const { id } = await verifyTokenAsync(token);
        const user = await User.findOne({where: {id}, attributes: {exclude: ['password']}});
        if(!user)
            return next({status: 404, message: 'Invalid user'});
        
        req.user = user;
        next();
    } catch (e) {
        next({status: 400, message: e})
    }
}