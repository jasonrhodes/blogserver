var db = require("../data/load")
  , upsert = require("../lib/upsert")

module.exports = {

  /**
   * Get a list of talks
   * 
   */
  list: function (req, res) {

    var page = req.params.page || 1;
    var perPage = req.params.per_page || 20;
    var skip = (page - 1) * perPage;

    db.talks.find({}).skip(skip).limit(perPage).exec(function (err, talks) {

      if (err) {
        res.send(err);
        return;
      }
      
      res.send(200, talks);

    });

  },

  /**
   * Create a new talk
   *
   */
  create: function (req, res) {

    upsert(req.body, db.talks, function (err, num, talk) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(201, talk);
    
    });

  },

  /**
   * Get a single talk
   * 
   */
  single: function (req, res) {

    db.talks.find({ _id: req.params.id }, function (err, talk) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(200, talk[0]);

    });

  },

  /**
   * Edit a single talk
   * 
   */
  update: function (req, res) {

    req.body._id = req.params.id;

    upsert(req.body, db.talks, function (err, num) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(200, { "message": "Updated " + num + " talk(s)" });
    
    });

  },

  /**
   * Delete a single talk
   * 
   */
  delete: function (req, res) {

    db.talks.remove({ _id: req.params.id }, function (err, num) {

      if (err) {
        res.send(err);
        return;
      }

      res.send(200, { "message": "Removed " + num + " talk(s)" });
      // res.send(204);

    });

  }

}