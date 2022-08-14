const express = require('express');

const app = express();

app.use(express.json()) // équivalent à bodyParser converti le body en json
//résolution des prblèmes CORS on ajoute des entêtes de config et de permissions 
app.use((req, res, next) => {
   res.setHeader('Access-Control-Allow-Origin', '*'); // autorise l'accès a l'api à partir de n'importe quelle adresse !
   res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
   res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
   next(); // on n'oublie pas le next 
 });
app.post('/api/stuff',(req,res,next) => {
   console.log(req.body);
   res.status(201).json({
      message:'Objet créé'
   })
})
app.get('/api/stuff', (req, res, next) => {
   const stuff = [
     {
       _id: 'oeihfzeoi',
       title: 'Mon premier objet',
       description: 'Les infos de mon premier objet',
       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
       price: 4900,
       userId: 'qsomihvqios',
     },
     {
       _id: 'oeihfzeomoihi',
       title: 'Mon deuxième objet',
       description: 'Les infos de mon deuxième objet',
       imageUrl: 'https://cdn.pixabay.com/photo/2019/06/11/18/56/camera-4267692_1280.jpg',
       price: 2900,
       userId: 'qsomihvqios',
     },
   ];
   res.status(200).json(stuff);
 });

module.exports = app;