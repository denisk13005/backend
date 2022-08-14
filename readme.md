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

