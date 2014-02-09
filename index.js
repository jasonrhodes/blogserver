var express = require("express")
  , app = express()
  , Datastore = require("nedb")
  ;

var port = process.argv[2] || 5000;

var db = {
  posts: new Datastore({
      filename: "./blogdb"
    , autoload: true
  })
};

function upsertPost(post, callback) {

  if (!post._id && !post.publishDate) {
    post.publishDate = new Date();
  }
  
  db.posts.update({ _id: post._id }, post, { upsert: true }, callback);

}

app.use(express.bodyParser());

app.use(function (req, res, next) {
  res.type("application/json");
  next();
});

/**
 * Get a list of posts
 * 
 */
app.get("/posts", function (req, res) {

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

});

/**
 * Create a new post
 *
 */
app.post("/posts", function (req, res) {

  upsertPost(req.body, function (err, num, post) {

    if (err) {
      res.send(err);
      return;
    }

    res.send(201, post);
  
  });

});

/**
 * Get a single post
 * 
 */
app.get("/posts/:id", function (req, res) {

  db.posts.find({ _id: req.params.id }, function (err, post) {

    if (err) {
      res.send(err);
      return;
    }

    res.send(200, post);

  });

});

/**
 * Edit a single post
 * 
 */
app.put("/posts/:id", function (req, res) {

  req.body._id = req.params.id;

  upsertPost(req.body, function (err, num) {

    if (err) {
      res.send(err);
      return;
    }

    res.send(200, { "message": "Updated " + num + " post(s)" });
  
  });

});

/**
 * Delete a single post
 * 
 */
app.delete("/posts/:id", function (req, res) {

  db.posts.remove({ _id: req.params.id }, function (err, num) {

    if (err) {
      res.send(err);
      return;
    }

    res.send(200, { "message": "Removed " + num + " post(s)" });
    // res.send(204);

  });

});


app.listen(port);

console.log("\nblogserver listening on port " + port + "...");
