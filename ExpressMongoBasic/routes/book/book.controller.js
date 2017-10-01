(function() {
    'use strict';

    var Book = require('./book.model.js');

//Basic CRUD
    
    // READ
    // "get" - will grab all for display
    module.exports.getAll = function(req, res) { 
        Book.find({}, function (err, post) {
            if (err) {
                console.error(err);
                return res.status(500).send(err);
            }
            res.json(post);
        });
    };

    // CREATE
    // "start" - will create a new post
    module.exports.add = function(req, res) {

        // Check and make sure they supplied all parts of body
        // Note that since rating is a number that if you check for false a value of zero returns true
        if ( !req.body.title || !req.body.author || typeof(req.body.rating) != 'number') {
          req.status(400).send("Need a valid title, author, and rating in post body");
        }

        var book = new Book({
          title: req.body.title,
          author: req.body.author,
          rating: req.body.rating
        });
        
        book.save(function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }
          res.json(post);
        });
     };

    // UPDATE
    // "update" - will edit exsisting one
     module.exports.updateRating = function(req, res) {

        if (!req.body.id) {
          res.status(400).send("Need to add an id in body");
        } else if ( typeof(req.body.rating) != 'number') {
          res.status(400).send("Need to add rating");
        }

        Book.update({_id: req.body.id}, { $set: { rating: req.body.rating }}, function(err, post) {
          if (err) {
                console.error(err);
                return res.status(500).send(err);
          }  
          res.json(post);
        });
     };    
    
     // DELETE
     // "delete" - removes a post
     // WARNING: No undo so delete at own cost
     module.exports.delete = function(req, res) {
        // SHOULD have authenticaton token so no one can just randomly call the delete URL

         Book.findOneAndRemove({_id: req.params.id}, function(err, removedPost) {
          if (err) {
            console.error(err);
            return res.status(500).send(err);
          }
          res.json(removedPost);
        });
     };    
    
})();