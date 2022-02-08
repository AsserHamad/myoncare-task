var express = require('express');
var router = express.Router();
const { register, login, verifyAccessToken } = require('../controllers/auth.controller');
const { isAuthenticated } = require('../middlewares/auth.middleware');
const { checkValidationErrors } = require('../utils/errors.validators');
const { registerValidator, loginValidator } = require('../validators/auth.validators');

router.post('/register', registerValidator, checkValidationErrors, register);
router.post('/login', loginValidator, checkValidationErrors, login);

router.get('/verify', isAuthenticated, verifyAccessToken);

module.exports = router;
