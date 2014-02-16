var request = require("request")
  , _ = require("underscore")
  , async = require("async")
  , fs = require("fs")

var base = "http://localhost:5000/api/";

var options = {
    method: "GET",
    headers: {
        "Content-type": "application/json"
    }
};

var templates = {};

async.parallel([

  function (callback) {

    request(_.extend(options, { url: base + "posts" }), function (err, response, body) {

      err ? callback(err) : callback(null, JSON.parse(body));

    })

  }

  , function (callback) {

    request(_.extend(options, { url: base + "talks" }), function (err, response, body) {

      err ? callback(err) : callback(null, JSON.parse(body));

    })

  }

  , function (callback) {

    fs.readFile(process.cwd() + "/site/layout.html", function (err, data) {

      err ? callback(err) : callback(null, _.template(data.toString()));

    })

  }

  , function (callback) {

    fs.readFile(process.cwd() + "/site/post.html", function (err, data) {

      err ? callback(err) : callback(null, _.template(data.toString()));

    })

  }

  , function (callback) {

    fs.readFile(process.cwd() + "/site/talk.html", function (err, data) {

      err ? callback(err) : callback(null, _.template(data.toString()));

    })

  }

], function (err, data) {

  var posts = data[0];
  var talks = data[1];

  templates.layout = data[2];
  templates.post = data[3];
  templates.talk = data[4];

  // Nested template within a single master "layout"
  exportPosts(posts, function (data) { return templates.layout({ content: templates.post(data) }) });
  exportTalks(talks, function (data) { return templates.layout({ content: templates.talk(data) }) });

  // exportStatics({ posts: posts, talks: talks });

});

function exportPosts(posts, render) {

  var dir = process.cwd() + "/site/posts";

  async.each(fs.readdirSync(dir), function (file, callback) {
    
    fs.unlink(dir + "/" + file, callback);
  
  }, function () {

    fs.rmdirSync(dir);
    fs.mkdirSync(dir);

    async.each(posts, function (post, callback) {

      var html = render(post);
      fs.writeFile(dir + "/post-" + (Math.round(Math.random() * 100)) + ".html", html, callback);

    }, function (err) {

      if (err) console.error(err);

    });

  });

}

function exportTalks(talks, render) {

  var dir = process.cwd() + "/site/talks";

  async.each(fs.readdirSync(dir), function (file, callback) {

    fs.unlink(dir + "/" + file, callback);
  
  }, function () {

    fs.rmdirSync(dir);
    fs.mkdirSync(dir);

    async.each(talks, function (talk, callback) {

      var html = render(talk);
      fs.writeFile(dir + "/talk-" + (Math.round(Math.random() * 100)) + ".html", html, callback);

    }, function (err) {

      if (err) console.error(err);

    });

  });

  

}

function exportStatics(data) {

}