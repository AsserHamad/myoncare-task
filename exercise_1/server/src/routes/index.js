const userRouter = require('./users');
const authRouter = require('./auth');
const { isAuthenticated } = require('../middlewares/auth.middleware');

module.exports = app => {
  app.use('/api/auth', authRouter);
  app.use('/api/users', isAuthenticated, userRouter);
};
