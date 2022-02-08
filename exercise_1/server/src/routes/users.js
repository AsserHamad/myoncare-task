var express = require('express');
const { getAllUsers, getUser } = require('../controllers/user.controller');
var router = express.Router();

router.get('/', getAllUsers);
router.get('/:id', getUser);

module.exports = router;
