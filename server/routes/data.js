
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
      }
      else {
        res.status(200).json(response.hits.hits);
      }
  });

})

module.exports = router;




