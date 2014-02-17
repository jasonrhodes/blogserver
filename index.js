var express = require("express")
  , app = express()
  , fs = require("fs")
  , path = require("path")
  , cons = require("consolidate")
  , port = process.argv[2] || 5000
  , routes = {}

// assign the underscore engine to .html files
app.engine('html', cons.underscore);

// set .html as the default extension 
app.set('view engine', 'html');
app.set('views', path.join(__dirname, 'views'));

app.use(express.json());

routes.admin = require("./routes/admin")
routes.posts = require("./routes/posts")
routes.talks = require("./routes/talks")

/**
 * Admin UI
 * 
 */

// Serve the exported site as static files (for now, maybe move to another repo)
app.use(express.static(path.join(__dirname, "/export")));

// Serve the admin assets as static files
app.use("/admin/assets", express.static(path.join(__dirname, "/admin/assets")));

// Divert anything else that matches /admin* to the index.html page (a la mod_rewrite)
app.get("/admin/:path?*", routes.admin.index);



/**
 * Content API
 * 
 */


app.use("/api", function (req, res, next) {
  res.type("application/json");
  next();
});

// Posts
app.get("/api/posts", routes.posts.list);
app.post("/api/posts", routes.posts.create);
app.get("/api/posts/:id", routes.posts.single);
app.put("/api/posts/:id", routes.posts.update);
app.delete("/api/posts/:id", routes.posts.delete);

// Talks
app.get("/api/talks", routes.talks.list);
app.post("/api/talks", routes.talks.create);
app.get("/api/talks/:id", routes.talks.single);
app.put("/api/talks/:id", routes.talks.update);
app.delete("/api/talks/:id", routes.talks.delete);

/**
 * Start application
 * 
 */

app.listen(port);

console.log("\nBlogamatic listening on port " + port + "...");
