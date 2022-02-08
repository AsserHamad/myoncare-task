const { DataTypes } = require('sequelize');

const db = require('./db-connection').getDb();
const User = require('../models/user.model');

const query = db.getQueryInterface();
const random = require('random-name');

query.createTable('User', {
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING
    }
});

setTimeout(
  async () => {
    try {
      const password = 'abcd1234';
      const values = Object.keys([...Array(10)]).map(index => {
        const first = random.first(), last = random.last();
        return {
          email : `${first.toLowerCase()}${last.toLowerCase()}${index}@mail.com`,
          password,
          name: `${first} ${last}`
        }
      });
      await User.bulkCreate(values, {
        individualHooks: true
      });
    } catch(e) {
      console.log(e);
    }
  }
, 200);