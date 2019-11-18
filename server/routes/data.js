
const express = require ('express');
const router = express.Router();
var client = require('./connection.js');
const token = require('./verify-token');

router.post('/searchData', token.verifyToken, (req, res) => {

  client.search({
    index: req.body.pack_query,
    type: 'doc',
    body: {
      query: {
        match: { "hostIdentifier": req.body.hostIdentifier}
      },
    }
  },function (error, response,status) {
      if (error){
        console.log("search error: "+error)
        res.status(status).send(error);
      }
      else {
        dataResponse = [];
        let keys = [];
        response.hits.hits.forEach(function(hit){
          if (hit._source.hostIdentifier === req.body.hostIdentifier) {
            dataResponse.push(hit._source.columns);
            keys = Object.keys(hit._source.columns);
          }
        })

        dataTable = [];
        dataTable.push(keys);
        for (var i = 0; i < dataResponse.length; i ++) {
          obj = [];
          for (var j = 0; j < keys.length; j++) {
            var key = keys[j]
            obj.push(dataResponse[i][key]);            
          }
          dataTable.push(obj);

        }
        res.status(status).json(dataTable);
      }
  });
})

module.exports = router;