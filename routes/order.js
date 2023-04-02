const express = require('express')
const router = express.Router()
const orderCtrl = require('../controllers/order')

router.post('/' , orderCtrl.createOrder)

module.exports = router