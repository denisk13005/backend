const express = require('express');
const router = express.Router();

const stuffCtrl = require('../controllers/stuff');// on appelle le controller qui va gérer la logique métier grâce à des fontions que l'on passera en callback dans la méthode voulue de notre router 

router.get('/', stuffCtrl.getAllStuff);
router.post('/', stuffCtrl.createThing);
router.get('/:id', stuffCtrl.getOneThing);
router.put('/:id', stuffCtrl.modifyThing);
router.delete('/:id', stuffCtrl.deleteThing);

module.exports = router;