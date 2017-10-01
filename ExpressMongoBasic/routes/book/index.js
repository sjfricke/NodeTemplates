(function() {
  'use strict';

  var express = require('express');
  var controller = require('./book.controller.js')    
    
  var router = express.Router();

  // Create last layer of API call so a POST request to /api/count/start
  // will run the "start" function the controller
  router.get('/', controller.getAll);
  router.post('/', controller.add);
  router.post('/update/rating/', controller.updateRating);
  router.delete('/:id', controller.delete);  

  module.exports = router;

})();