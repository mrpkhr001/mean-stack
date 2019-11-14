
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var http = require('http');
var fs = require('fs');
var cors = require('cors')

const api = require('./server/routes/api');
const data = require('./server/routes/data');

const serverPort = process.env.PORT || 8080;

const appServer = express();

appServer.use(express.static(path.join(__dirname, 'dist/opstinuum')));
appServer.use(bodyParser.urlencoded({extended: true}));
appServer.use(cors())

appServer.use(bodyParser.json());
appServer.use('/api', api);
appServer.use('/data', data);

appServer.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/opstinuum/index.html'))
})

var hskey = fs.readFileSync('serverPrivateKey.pem');
var hscert = fs.readFileSync('server.crt')

var options = {
  key: hskey,
  cert: hscert
};

var server = http.createServer(appServer);

server.listen(serverPort, function () {
  console.log('Server Node Express server is up on ' + serverPort);
});
