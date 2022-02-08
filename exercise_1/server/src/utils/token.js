const jwt = require('jsonwebtoken');
const { JWT_SECRET } = process.env;

exports.verifyTokenAsync = async token => {
    return await new Promise((resolve, reject) => {
        jwt.verify(token, JWT_SECRET, (err, token) => {
            if(err) reject(err);
            else resolve(token);
        })
    })
};

exports.generateTokenAsync = async payload => {
    return await new Promise((resolve, reject) => {
        jwt.sign(payload, JWT_SECRET, {expiresIn: "45d"}, (err, token) => {
            if(err) reject(err);
            else resolve(token);
        })
    })
}