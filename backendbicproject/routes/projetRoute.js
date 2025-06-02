const express = require('express');
const router = express.Router();
const projetController = require('../controllers/projetController');
const upload = require('../middlewares/uploads');

// CREATE
router.post('/add', upload.single('file'),projetController.addProjet);

// READ all projets of a user with their formation
router.get('/user/:userId', projetController.getAllProjets);

// READ single projet by ID
router.get('/one/:id', projetController.getProjetById);

// UPDATE
router.put('/:id', upload.single('file'), projetController.updateProjet);

// DELETE
router.delete('/:id', projetController.deleteProjet);

module.exports = router;
