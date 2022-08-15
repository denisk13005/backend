const express = require('express')
const router = express.Router()

const Thing = require('../models/Thing')

//  route post
router.post('/', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({ // on crée une instance de Thing avec le corp de la requête
    ...req.body
  });
  thing.save() // on l'ajoute a la bdd grâce à la méthode .save
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});

// PUT
router.put('/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id }) // on remet l'id car on ne peut pas modifier un paramètre immutable comme l'id 
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
//DELETE
router.delete('/:id', (req, res, next) => {
  Thing.deleteOne({ _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
    .catch(error => res.status(400).json({ error }));
});
//get un objet grace à son id passé en paramètre dans l'url
router.get('/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id }) //on extrait l'objet grâce à findOne
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
router.get('/', (req, res, next) => {
  Thing.find()
    .then(things => res.status(200).json(things))
    .catch(error => res.status(400).json({ error }));
});

module.exports = router