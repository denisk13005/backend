const express = require('express');
const mongoose = require('mongoose')
const Thing = require('./models/Thing');
const app = express();

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
 app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
app.use('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;