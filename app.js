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
 //route post
 app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({ // on crée une instance de Thing avec le corp de la requête
    ...req.body
  });
  thing.save() // on l'ajoute a la bdd grâce à la méthode .save
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

// PUT
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // on remet l'id car on ne peut pas modifier un paramètre immutable comme l'id 
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
//DELETE
app.delete('/api/stuff/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});
//get un objet grace à son id passé en paramètre dans l'url
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) //on extrait l'objet grâce à findOne
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
app.get('/api/stuff', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = app;