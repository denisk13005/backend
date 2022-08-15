const express = require('express');
const mongoose = require('mongoose');
// const Product = require('./models/Product') //TP fin partie 3
const app = express();

const stuffRoutes = require('./routes/stuff')

mongoose.connect(process.env.MONGO_URI || `mongodb+srv://denisk13005:Lucas*2808@cluster0.upft3lg.mongodb.net/?retryWrites=true&w=majority`,
  { useNewUrlParser: true,
    useUnifiedTopology: true })
  .then(() => console.log('Connexion à MongoDB réussie !'))
  .catch(() => console.log('Connexion à MongoDB échouée !'));

  
app.use(express.json()) // équivalent à bodyParser converti le body en json
//résolution des prblèmes CORS on ajoute des entêtes de config et de permissions 
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // autorise l'accès a l'api à partir de n'importe quelle adresse !
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next(); // on n'oublie pas le next 
});

app.use('/api/stuff', stuffRoutes) // on fait appel au router 

// *****************************************************************************TP fin partie 2
// app.post('/api/products',(req,res,next)=> {
//   const product = new Product({
//     ...req.body
//   })
//   console.log(product)
//        product.save() // on l'ajoute a la bdd grâce à la méthode .save
//          .then(() => res.status(201).json({product}))
//         .catch(error => res.status(400).json({ error }));
// })
// app.put('/api/products/:id', (req, res, next) => {
//    Product.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // on remet l'id car on ne peut pas modifier un paramètre immutable comme l'id 
//      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
//      .catch(error => res.status(400).json({ error }));
//  });
// app.delete('/api/products/:id', (req, res, next) => {
//     Product.deleteOne({ _id: req.params.id })
//      .then(() => res.status(200).json({ message: 'Deleted'}))
//      .catch(error => res.status(400).json({ error }));
//    });
// app.get('/api/products/:id',(req,res,next)=> {
//   Product.findOne({_id: req.params.id})
//     .then(product=> res.status(200).json({ product}))
//     .catch(error => res.status(400).json(error))
// })
// app.get('/api/products',(req,res,next)=> {
//   Product.find()
//     .then(products => res.status(200).json({products}))
//     .catch(error => res.status(400).json(error))
// })
module.exports = app;