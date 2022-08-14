# création d'un back avec node express mongodb mongoose 

on crée le dossier back 
`cd back && npm init && npm install mongodb express mongoose nodemon` comme ça c'est fait ^^

creation de .gitignore et de server.js qui sera le poitn d'entrée de notre application 

```
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('Voilà la réponse du serveur !');
});

server.listen(process.env.PORT || 3000);
console.log("server start")
```

## Serveur avec express (plus pratique et moins long quavec node)

<a>https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466277-creez-une-application-express#/id/video_Player_3</a>

`npm i express` dans le dossier backend

Création du fichier app.js qui contiendra notre app express 
```
const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;
```

on importe notre appli express dans server.js

```
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000); La fonction app.set() permet d’attribuer le nom du paramètre à la valeur. Vous pouvez stocker n’importe quelle valeur de votre choix, mais certains noms peuvent être utilisés pour configurer le comportement du serveur.
const server = http.createServer(app); // on passe l'app express en paramètres de la méthode createServer

server.listen(process.env.PORT || 3000);
```

### Ajout des middlewares 

Une application Express est fondamentalement une série de fonctions appelées middleware. Chaque élément de middleware reçoit les objets request et response , peut les lire, les analyser et les manipuler, le cas échéant. 

<a>https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/6466277-creez-une-application-express#/id/video_Player_4</a>

### Modif du fichier server.js pour le rendre plus stable et approprié au déploiement 

```
const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);

```
Aperçu rapide de ce qui se passe ici :

    la fonction normalizePort renvoie un port valide, qu'il soit fourni sous la forme d'un numéro ou d'une chaîne ;

    la fonction errorHandler  recherche les différentes erreurs et les gère de manière appropriée. Elle est ensuite enregistrée dans le serveur ;

    un écouteur d'évènements est également enregistré, consignant le port ou le canal nommé sur lequel le serveur s'exécute dans la console.

### Ecriture du middleware pour notre première requête GET

On remplace le middleware dans app.js par celui ci : 

```
app.use('/api/stuff', (req, res, next) => {
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
```

### Résolution des problèmes des cors

le CORS est une sécurité qui empêche l'accès à l'api si l'adresse front et back n'est pas la mm

pour résoudre ce problème on crée un middleware d'autorisation qui va configurer les entêtes de réponses (voir app.js)
Ces headers permettent :
    d'accéder à notre API depuis n'importe quelle origine ( '*' ) ;
    d'ajouter les headers mentionnés aux requêtes envoyées vers notre API (Origin , X-Requested-With , etc.) ;
    d'envoyer des requêtes avec les méthodes mentionnées ( GET ,POST , etc.).
En résumé:
    La méthode app.use() vous permet d'attribuer un middleware à une route spécifique de votre application.
    Le CORS définit comment les serveurs et les navigateurs interagissent, en spécifiant quelles ressources peuvent être demandées de manière légitime – par défaut, les requêtes AJAX sont interdites.
    Pour permettre des requêtes cross-origin (et empêcher des erreurs CORS), des headers spécifiques de contrôle d'accès doivent être précisés pour tous vos objets de réponse.