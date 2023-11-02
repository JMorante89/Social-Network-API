const router = require('express').Router();
const userRoutes = require('./userRoutes');
const thoughtRoutes = require('./thoughtRoutes');
//localhost:3001/api/thoughts
router.use('/thoughts', thoughtRoutes);
//localhost:3001/api/users
router.use('/users', userRoutes);

module.exports = router;
