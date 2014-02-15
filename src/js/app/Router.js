/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  
Backbone.$ = $;

var Views = {
      Home: require("./views/Home")
    , PostForm: require("./views/PostForm")
    , TalkForm: require("./views/TalkForm")
  }
  , Models = {
      Post: require("./models/Post")
  }
  , Collections = {
      PostList: require("./collections/PostList")
    , TalkList: require("./collections/TalkList")
  }

var postList = new Collections.PostList();
var talkList = new Collections.TalkList();

/**
 * Models.Post
 * 
 */
module.exports = Backbone.Router.extend({

  routes: {
    "": "index",
    //"posts": "posts",
    "posts/:id/edit": "editPost",
    "talks/:id/edit": "editTalk",
    "posts/new": "createPost",
    "talks/new": "createTalk"
  },

  index: function () {
    new Views.Home();
  },

  posts: function () {
    new Views.PostsHome();
  },

  editPost: function (id) {
    var list = new Collections.PostList({ id: id });
    var post = list.at(0);
    post.fetch().done(function () {
      new Views.PostForm({ model: post });
    });
  },

  createPost: function () {
    new Views.PostForm({ collection: postList });
  },

  editTalk: function (id) {
    var list = new Collections.TalkList({ id: id });
    var talk = list.at(0);
    talk.fetch().done(function () {
      new Views.TalkForm({ model: talk });
    });
  },

  createTalk: function () {
    new Views.TalkForm({ collection: talkList });
  }

});