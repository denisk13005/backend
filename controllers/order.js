const Order = require('../models/Order')

exports.createOrder = (req,res,next) => {
  const order = new Order({
    userId : req.userId,
    order : req.order
  })
  order.save()
    .then(() => {
      res.status(201).json({
        message:'order created'
      })
    })
    .catch(err => res.status(400).json(err))
}