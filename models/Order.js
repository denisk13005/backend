const mongoose = require('mongoose');

const orderSchema = mongoose.Schema({
  userId: { type: String, required: true } ,
  order : { type :Object, required : true}
  
});

module.exports = mongoose.model('Order', orderSchema);