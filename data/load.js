var Datastore = require("nedb");

module.exports = {

  posts: new Datastore({
      filename: "./data/posts"
    , autoload: true
  }),

  talks: new Datastore({
      filename: "./data/talks"
    , autoload: true
  })

};