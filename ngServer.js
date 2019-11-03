const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
var https = require('https');
var fs = require('fs');

const app = express();
const port = 8081;


app.use(express.static(__dirname + '/dist/opstinuum'));

app.get('/*', function(req,res) {
    res.sendFile(path.join(__dirname + '/dist/opstinuum/index.html'));
});

var hskey = fs.readFileSync('serverPrivateKey.pem');
var hscert = fs.readFileSync('server.crt')

var options = {
  key: hskey,
  cert: hscert
};

var server = https.createServer(options, app);

server.listen(port, function () {
  console.log('Angular Express server is up on 8081');
});

