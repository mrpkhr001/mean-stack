
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var https = require('https');
var fs = require('fs');
var cors = require('cors')

const api = require('./server/routes/api');
const serverPort = 8443;
const clientPort = 8080;

const appServer = express();
const appClient = express();

appServer.use(express.static(path.join(__dirname, 'dist')));
appServer.use(bodyParser.urlencoded({extended: true}));
appServer.use(cors())

appClient.use(express.static(__dirname + '/dist/opstinuum'));


appServer.use(bodyParser.json());

appServer.use('/api', api);

appClient.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'dist/opstinuum/index.html'));
});

var hskey = fs.readFileSync('serverPrivateKey.pem');
var hscert = fs.readFileSync('server.crt')

var options = {
  key: hskey,
  cert: hscert
};

var server = https.createServer(options, appServer);
var client = https.createServer(options, appClient);

server.listen(serverPort, function () {
  console.log('Server Node Express server is up on 8443');
});
