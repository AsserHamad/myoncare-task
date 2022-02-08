const { DataTypes } = require('sequelize');
const db = require('../db/db-connection').getDb();
const bcrypt = require('bcrypt');

const User = db.define('Users', {
  // Model attributes are defined here
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
      type: DataTypes.STRING,
      allowNull: false,
  },
  name: {
    type: DataTypes.STRING
  }
}, {
  hooks: {
    beforeSave: async user => {
      const hashedPass = await new Promise((resolve, reject) => {
        bcrypt.hash(user.password, 10, (err, hash) => {
        if(err) return reject(err);
        resolve(hash);
        });
      });
      user.password = hashedPass;
      return user;
    }, 

    afterCreate : record => {
      delete record.dataValues.password;
      delete record.dataValues.updatedAt;
    }
  },
});

User.prototype.comparePassword = async (password, userPassword) => {
  return await new Promise((resolve, reject) => {
  bcrypt.compare(password, userPassword, (err, match) => {
    if(err) reject(err);
    else resolve(match);
  })
  })
};

User.sync();

module.exports = User;