const express = require('express');
const auth = require('../middlewares/auth');
const stuffCtrl = require('../controllers/stuff');
const multer = require('../middlewares/multer-config')
const router = express.Router();

router.get('/',  stuffCtrl.getAllStuff);
router.post('/', auth,multer, stuffCtrl.createThing);
router.get('/:id', auth, stuffCtrl.getOneThing);
router.put('/:id', auth, multer,stuffCtrl.modifyThing);
router.delete('/:id', auth, stuffCtrl.deleteThing);

module.exports = router;