const { body, check } = require("express-validator");
const User = require('../models/user.model');

exports.registerValidator = [
        body("email")
        .trim()
        .not()
        .isEmpty()
        .withMessage('Email must not be empty')
        .bail()
        .isEmail()
        .withMessage('Must be a valid email address'),

        check('email').custom(async email => {
            const user = await User.findOne({where: {email}});
            if(user && email)
                return Promise.reject('This email is already in use');
        }),
        
        body("password")
        .not()
        .isEmpty()
        .bail()
        .isLength({ min: 8, max: 30 })
        .withMessage('Password must be between 8 and 30 characters in length')
        .bail()
        .matches(/^[a-zA-Z\d@$.!%*#?&-_ {}/[\]]{8,30}$/)
        .withMessage('Passwords cannot contain certain special characters')
    ];

exports.loginValidator = [
    body("email")
    .trim()
    .not()
    .isEmpty()
    .withMessage('Email must not be empty')
    .bail()
    .isEmail()
    .withMessage('Must be a valid email address'),
    
    body("password")
    .not()
    .isEmpty()
    .bail()
    .isLength({ min: 8, max: 30 })
    .withMessage('Password must be between 8 and 30 characters in length')
    .bail()
    .matches(/^[a-zA-Z\d@$.!%*#?&-_ {}/[\]]{8,30}$/)
    .withMessage('Passwords cannot contain certain special characters')
];