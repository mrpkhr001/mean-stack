
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var https = require('https');
var fs = require('fs');
var cors = require('cors')

const api = require('./server/routes/api');
const serverPort = process.env.PORT || 8443;

const appServer = express();

appServer.use(express.static(path.join(__dirname, 'dist/opstinuum')));
appServer.use(bodyParser.urlencoded({extended: true}));
appServer.use(cors())

appServer.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/opstinuum/index.html'))
})

appServer.use(bodyParser.json());
appServer.use('/api', api);

var hskey = fs.readFileSync('serverPrivateKey.pem');
var hscert = fs.readFileSync('server.crt')

var options = {
  key: hskey,
  cert: hscert
};

var server = https.createServer(options, appServer);

server.listen(serverPort, function () {
  console.log('Server Node Express server is up on ' + serverPort);
});
