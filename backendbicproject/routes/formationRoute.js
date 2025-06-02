const express = require('express');
const router = express.Router();
const formationController = require('../controllers/formationController');


router.get('/list/:id', formationController.getAllFormations);
router.get('/:id', formationController.getFormationById);
router.post('/add', formationController.createFormation);
router.put('/update/:id', formationController.updateFormation);
router.delete('/delete/:id', formationController.deleteFormation);






module.exports = router;
