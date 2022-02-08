var express = require('express');
const { getAllUsers, getUser, updateUser, deleteUser } = require('../controllers/user.controller');
var router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

router.patch('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
