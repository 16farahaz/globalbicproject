const express = require('express');
const router = express.Router();

const userRouter = require('./userRoute');
const formationRouter = require('./formationRoute');
const evaluationacRouter = require('./evaluationacRoute');
const projetRouter = require('./projetRoute');
const testRouter = require('../routes/testTechniqueRoute');


router.use('/user', userRouter);
router.use('/formation', formationRouter);
router.use('/evaluationac', evaluationacRouter);
router.use('/projet',projetRouter);
router.use('/test',testRouter);

module.exports = router;
