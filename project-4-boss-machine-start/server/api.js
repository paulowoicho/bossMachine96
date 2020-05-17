const express = require('express');
const apiRouter = express.Router();

//miniions router
const minionsRouter = require('./minions');
apiRouter.use('/minions', minionsRouter);

//ideas router
const ideasRouter = require('./ideas');
apiRouter.use('/ideas', ideasRouter);

//meetings router
const meetingsRouter = require('./meetings');
apiRouter.use('/meetings', meetingsRouter);

module.exports = apiRouter;
