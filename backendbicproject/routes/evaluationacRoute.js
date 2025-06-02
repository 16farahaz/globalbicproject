const express = require('express');
const router = express.Router();
const evaluationController = require('../controllers/evaluationacController');

// Evaluation routes
router.post('/add', evaluationController.createEvaluation);
//get all evaluations for a specifique formation
router.get('/oneformation/:id', evaluationController.getFormationEvaluations);
//get all evaluations for a specifique user
router.get('/user/:id', evaluationController.getUserEvaluations);
//have score of a specific evaluation (awka 7adhrthelk ya maryem )
router.get('/evaluation/:id', evaluationController.getFormationScore);




module.exports = router;
