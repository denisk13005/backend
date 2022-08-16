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

## Création de la route POST

il faut extraire le corps JSON le la requête pour cela on utilise le middleware `app.use(express.json())` équivalent à body parser

ensuite on écrit notre middleware qui traitera la route post
```
app.post('/api/stuff', (req, res, next) => {
  console.log(req.body);
  res.status(201).json({
    message: 'Objet créé !'
  });
});
```
### Questionnaire résumant la première partie 

https://openclassrooms.com/fr/courses/6390246-passez-au-full-stack-avec-node-js-express-et-mongodb/exercises/3690


### Création de la base de donnée Mongodb et installation de Mongoose

`npm i mongoose`
on l'importe dans app.js `const mongoose = require('mongoose')`

on crée la bdd on récupère les identifiants que l'on rentre en premier paramètre de la méthode connect de mongoose 

on place cette méthode juste en dessous de la déclaration de app 

## Schéma de données

on crée un dossier models
on crée un fichier objet qui déterminera le schéma de notre objet
on exporte le modèle grâce a mongoose.model('Nom du fichier', Nom du schéma)

## Enregistrement du nouvel objet dans la BDD

On importe notre modèle dans app.js 
`const Thing = require('./models/thing');`
On implémente la logique de la méthode post
```
app.post('/api/stuff', (req, res, next) => {
  delete req.body._id;
  const thing = new Thing({
    ...req.body
  });
  thing.save()
    .then(() => res.status(201).json({ message: 'Objet enregistré !'}))
    .catch(error => res.status(400).json({ error }));
});
```
## Récupération d'un objet grâce à son id passé dans l'url
```
app.get('/api/stuff/:id', (req, res, next) => {
  Thing.findOne({ _id: req.params.id })
    .then(thing => res.status(200).json(thing))
    .catch(error => res.status(404).json({ error }));
});
```
    Les méthodes de votre modèle Thing permettent d'interagir avec la base de données :

        save()  – enregistre un Thing ;

        find()  – retourne tous les Things ;

        findOne()  – retourne un seul Thing basé sur la fonction de comparaison qu'on lui passe (souvent pour récupérer un Thing par son identifiant unique).

    La méthode  app.get()  permet de réagir uniquement aux requêtes de type GET.

## Route Put modifier un objet

```
app.put('/api/stuff/:id', (req, res, next) => {
  Thing.updateOne({ _id: req.params.id }, { ...req.body, _id: req.params.id })
    .then(() => res.status(200).json({ message: 'Objet modifié !'}))
    .catch(error => res.status(400).json({ error }));
});
```
L'utilisation du mot-clé new avec un modèle Mongoose crée par défaut un champ_id . Utiliser ce mot-clé générerait une erreur, car nous tenterions de modifier un champ immuable dans un document de la base de données. Par conséquent, nous devons utiliser le paramètre id de la requête pour configurer notre Thing avec le même _id qu'avant.

# Refacto du code pour la lisibilité et la maintenabilité 
On va déplacer la logique de routage dans le dossier routes et la logique métier dans le dossier controllers 
## Création du router express
On crée routes/stuff.js qui gérera les endpoints à partir de l'url 'api/stuff'
on exporte le router, on l'importe dans app.js, on l'instancie comme stuffRoutes et on l'utilise avec `app.use('/api/stuff', stuffRoutes)`
En résumé

    La méthodeexpress.Router()  vous permet de créer des routeurs séparés pour chaque route principale de votre application – vous y enregistrez ensuite les routes individuelles.

    Un fichier de contrôleur exporte des méthodes qui sont ensuite attribuées aux routes pour améliorer la maintenabilité de votre application.

# Authentification
On installe ce package `npm install mongoose-unique-validator` pour qu'on ne puisse pas s'inscrire 2 fois avec le même email
On crée le modèle User avec mongoose dans models/User
En résumé

    bcrypt  est un package de cryptage que vous pouvez installer avec  npm  .

    mongoose-unique-validator  améliore les messages d'erreur lors de l'enregistrement de données uniques.

## Création du router et du controller pour user

Comme pour les Thing on crée un router qui servira les routes /auth... dans routes/user.js et un controller qui gérera les fonctions signup et login dans controllers/user.js

## hashage du mdp avec bcrypt lors de l'inscription d'un nouvel utilisateur

on installe le package bcrypt qui va nous permettre de hasher le map utilisateur `npm i bcrypt`
on importe le modèle User dans le controller
on crée la méthode signup en commençant par hasher le mdp puis on enregistre le nouvel utilisateur dans la bdd avec .save()

## Login avec vérif du mdp avec brcrypt et envoi du token si ok

On implémente la logique de login en vérifiant si l'utilisateur existe, on renvoie un msg général si il n'existe pas car c'est déjà une fuite de donnée que de savoir si un utilisateur est inscrit ou pas à un site !!
Si l'utilisateur existe on compare le hash du mdp avec celui enregistré en bdd grâce à bcrypt.compare , si c'est ok on renvoi l'_id de l'utilisateur et un token au front-end

## Envoie du token d'authentification avec jwt

On installe jwt `npm install jsonwebtoken`, on l'importe dans controllers/user.js et on génère le token si les identifiants sont exacts
En résumé

    Les JSON web tokens sont des tokens chiffrés qui peuvent être utilisés pour l'autorisation.

    La méthode sign() du package jsonwebtoken utilise une clé secrète pour chiffrer un token qui peut contenir un payload personnalisé et avoir une validité limitée.

## Middlaware d'authentification 

On crée un fichier middlewares/auth.js 
On crée une fonction qui va récupérer le token dans le header de la requête, le comparer grâce à .verify() et à la clé secrette 'RANDOM_TOKEN_SECRET', si le token est bon on extrait userId du token décodé et on l'ajoute à la requête avec req.auth.
Ensuite on ajoute ce middleware à toutes les routes que l'on veut protéger dans notre routeur routes/stuff avant le controller correspondant à la requête
En résumé

    La méthode verify() du package jsonwebtoken permet de vérifier la validité d'un token (sur une requête entrante, par exemple).

    Ajoutez bien votre middleware d'authentification dans le bon ordre sur les bonnes routes.

    Attention aux failles de sécurité !

# Accepter des fichiers entrant avec multer 

On va configurer un middleware qui nous permettra de stocker des fichiers entrants par exemple la photo d'un objet à vendre qu'un utilisateur chargera à partir de son dd

`npm i multer`
On crée un dossier images à la racine du backend pour enregistrer les images 
On crée le middlaware multer-config.js afin de définir une configuration pour multer 
Dans ce middleware :

    Nous créons une constante storage , à passer à multer comme configuration, qui contient la logique nécessaire pour indiquer à multer où enregistrer les fichiers entrants :

        la fonction destination indique à multer d'enregistrer les fichiers dans le dossier images ;

        la fonction filename indique à multer d'utiliser le nom d'origine, de remplacer les espaces par des underscores et d'ajouter un timestamp Date.now() comme nom de fichier. Elle utilise ensuite la constante dictionnaire de type MIME pour résoudre l'extension de fichier appropriée.

    Nous exportons ensuite l'élément multer entièrement configuré, lui passons notre constante storage et lui indiquons que nous gérerons uniquement les téléchargements de fichiers image.
En résumé

    multer est un package de gestion de fichiers.

    Sa méthode diskStorage()  configure le chemin et le nom de fichier pour les fichiers entrants.

    Sa méthode single()  crée un middleware qui capture les fichiers d'un certain type (passé en argument), et les enregistre au système de fichiers du serveur à l'aide du storage configuré.

## Modification de la route post pout accepter les fichier entrants
Pour que notre middleware de téléchargement de fichiers fonctionne sur nos routes, nous devrons modifier ces dernières, car le format d'une requête contenant un fichier du front-end est différent
Tout d'abord, ajoutons notre middleware multer à notre route POST dans notre routeur stuff `router.post('/', auth, multer, stuffCtrl.createThing);`
Pour gérer correctement la nouvelle requête entrante, nous devons mettre à jour notre contrôleur createThing
Que fait le code  ?

    Pour ajouter un fichier à la requête, le front-end doit envoyer les données de la requête sous la forme form-data et non sous forme de JSON. Le corps de la requête contient une chaîne thing, qui est simplement un objetThing converti en chaîne. Nous devons donc l'analyser à l'aide de JSON.parse() pour obtenir un objet utilisable.

    Nous supprimons le champ_userId de la requête envoyée par le client car nous ne devons pas lui faire confiance (rien ne l’empêcherait de nous passer le userId d’une autre personne). Nous le remplaçons en base de données par le _userId extrait du token par le middleware d’authentification.

    Nous devons également résoudre l'URL complète de notre image, car req.file.filename ne contient que le segment filename. Nous utilisons req.protocol pour obtenir le premier segment (dans notre cas 'http'). Nous ajoutons '://', puis utilisons req.get('host') pour résoudre l'hôte du serveur (ici, 'localhost:3000'). Nous ajoutons finalement '/images/' et le nom de fichier pour compléter notre URL.

Ensuite on rajoute une route dans app.js pour que notre requête à localhost://3000/images puisse avoir une réponse (jusqu'à présent nous n'avon de réponse que sur les routes /api/stuff et /api/auth)!!

O