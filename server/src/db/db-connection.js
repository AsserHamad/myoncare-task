const { Sequelize, Model, DataTypes } = require('sequelize');

let db = {};

exports.initializeDatabase = () => {
    db = new Sequelize('sqlite::memory:', {logging: false});
    
    db.authenticate().then(() => {
        console.log('Connected to the database successfully!');
    })
    .catch(err => {
        console.log('ERR: cannot connect to the database', err);
    })
}


exports.getDb = () => db;