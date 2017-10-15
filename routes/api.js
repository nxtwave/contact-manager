var express = require('express');
var router = express.Router();
var Dataservice = require('../lib/dataservice');

/**
 * Get list of contacts
 */
router.get('/contacts', function(req, res) {
  Dataservice.list().then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.send(err);
  });
});

/**
 * Get single contact by id
 */
router.get('/contact/:id', function(req, res) {
  Dataservice.get(req.params.id).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.send(err);
  });
});

/**
 * Update contact by id
 */
router.put('/contact/:id', function(req, res) {
  Dataservice.update(req.params.id, req.body).then(function(result) {
    res.json(result);
  }).catch(function(err) {
    res.send(err);
  });
});

module.exports = router;
