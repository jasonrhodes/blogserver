var request = require("request")
  , _ = require("underscore")
  , async = require("async")
  , fs = require("fs.extra")
  , path = require("path")

var base = "localhost:5000/api";

var options = {
    method: "GET",
    headers: {
        "Content-type": "application/json"
    }
};

var templates = {};

var target = path.join(process.cwd(), "export");

async.parallel([

  function (callback) {

    // GET /api/posts

    request(_.extend(options, { url: "http://" + path.join(base, "posts") }), function (err, response, body) {

      err ? callback(err) : callback(null, JSON.parse(body));

    })

  }

  , function (callback) {

    // GET /api/talks

    request(_.extend(options, { url: "http://" + path.join(base, "talks") }), function (err, response, body) {

      err ? callback(err) : callback(null, JSON.parse(body));

    })

  }

  , function (callback) {

    // Get site config from /site/config.json

    fs.readFile(path.join(process.cwd(), "site", "config.json"), function (err, data) {

      err ? callback(err) : callback(null, JSON.parse(data));

    })
  }

  , function (callback) {

    // Compile layout template

    fs.readFile(path.join(process.cwd(),  "site", "layout.html"), function (err, data) {

      err ? callback(err) : callback(null, _.template(data.toString()));

    })

  }

  , function (callback) {

    // Compile post template

    fs.readFile(path.join(process.cwd(), "site", "post.html"), function (err, data) {

      err ? callback(err) : callback(null, _.template(data.toString()));

    })

  }

  , function (callback) {

    // Compile talk template

    fs.readFile(path.join(process.cwd(), "site", "talk.html"), function (err, data) {

      err ? callback(err) : callback(null, _.template(data.toString()));

    })

  }

], function (err, data) {

  if (err) { console.error(err); return; }


  var posts = data.shift();
  var talks = data.shift();
  var config = data.shift();

  var templates = {
    layout: data.shift()
    , post: data.shift()
    , talk: data.shift()
  };

  fs.rmrf(target, function (err) {

    if (err) { console.error(err); return; }

    exportPosts(posts, function (data) { 
      return templates.layout({ 
        site: config
        , title: data.title
        , content: templates.post(data) 
      })
    });

    exportTalks(talks, function (data) { 
      return templates.layout({ 
        site: config
        , title: data.title
        , content: templates.talk(data) 
      })
    });

    exportStatics({ 
      posts: posts
      , talks: talks
      , site: config 
    }, templates.layout);

    fs.copyRecursive(path.join(process.cwd(), "site", "files"), target, function (err) {
      if (err) console.error(err);
    });

  });

});

function writeFiles(directory, items, render) {

  async.each(items, function (item, callback) {

    var directory = path.join(target, item.permalink.replace(/\/[^\/]+\.html$/, ""));
    var html = render(item);

    fs.mkdirpSync(directory);
    
    fs.writeFile(path.join(target, item.permalink), html, callback);

  }, function (err) {

    if (err) console.error(err);

  });

}

// function deleteFiles(directory, callback) {

//   var files = fs.readdirSync(directory) || [];

//   if (files) {

//     async.each(files, function (file, cb) {

//       fs.unlink(path.join(directory, file), cb);

//     }, callback);
  
//   }

//   else {

//     callback();
  
//   }

// }

function exportPosts(posts, render) {

  var directory = path.join(process.cwd(), "export", "posts");

  writeFiles(directory, posts, render);

}

function exportTalks(talks, render) {

  var directory = path.join(process.cwd(), "export", "talks");

  writeFiles(directory, talks, render);

}

// For now, all static pages MUST be one level deep max
function exportStatics(data, render) {

  var src = path.join(process.cwd(), "site", "pages")
  var pages = fs.readdirSync(src) || [];
  var dest = path.join(process.cwd(), "export");

  if (!pages) return;

  async.each(pages, function (page, cb) {

    fs.readFile(path.join(src, page), function (err, buf) {

      if (err) { 
        cb(err); 
        return; 
      }

      if (page !== "index.html") {
        page = page.replace(/\.html$/, "");
        fs.mkdirpSync(path.join(dest, page));
        page = path.join(page, "index.html");
      }
      
      fs.writeFile(path.join(dest, page), render({ 
        site: data.site
        , content: _.template(buf.toString(), data) 
      }), cb);

    })

  }, function (err) {

    if (err) console.error(err);

  });

}