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

`npm i express` dans le dossier backend

Création du fichier app.js qui contiendra notre app express 
`
const express = require('express');

const app = express();

app.use((req, res) => {
   res.json({ message: 'Votre requête a bien été reçue !' }); 
});

module.exports = app;
`

on importe notre appli express dans server.js

`
const http = require('http');
const app = require('./app');

app.set('port', process.env.PORT || 3000);
const server = http.createServer(app);

server.listen(process.env.PORT || 3000);
`

### Ajout des middlewares 
