const express = require('express');
const router = express.Router();

const userRouter = require('./userRoute');
const formationRouter = require('./formationRoute');
const evaluationacRouter = require('./evaluationacRoute');


router.use('/user', userRouter);
router.use('/formation', formationRouter);
router.use('/evaluationac', evaluationacRouter);


module.exports = router;
