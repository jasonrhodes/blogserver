var db = require("../data/load")
  , upsert = require("../lib/upsert")

module.exports = {

  /**
   * Get a list of posts
   * 
   */
  list: function (req, res) {

    var page = req.params.page || 1;
    var perPage = req.params.per_page || 20;
    var skip = (page - 1) * perPage;

    db.posts.find({}).skip(skip).limit(perPage).exec(function (err, posts) {

      if (err) {
        res.send(err);
        return;
      }
      
      res.send(200, posts);

    });

  },

  /**
   * Create a new post
   *
   */
  create: function (req, res) {

    upsert(req.body, db.posts, function (err, num, post) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(201, post);
    
    });

  },

  /**
   * Get a single post
   * 
   */
  single: function (req, res) {

    db.posts.find({ _id: req.params.id }, function (err, post) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(200, post[0]);

    });

  },

  /**
   * Edit a single post
   * 
   */
  update: function (req, res) {

    req.body._id = req.params.id;

    upsert(req.body, db.posts, function (err, num) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(200, { "message": "Updated " + num + " post(s)" });
    
    });

  },

  /**
   * Delete a single post
   * 
   */
  delete: function (req, res) {

    db.posts.remove({ _id: req.params.id }, function (err, num) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(200, { "message": "Removed " + num + " post(s)" });
      // res.send(204);

    });

  }

}