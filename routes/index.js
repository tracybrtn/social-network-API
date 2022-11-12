const router = require('express').Router();
const apiRoutes = require('./api');

//add '/api' prefix to API routes
router.use('/api', apiRoutes);

router.use((req, res) => {
  res.status(404).send('<h1> Oh no! 404 Error</h1>');
});

module.exports = router;