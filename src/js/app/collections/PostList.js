/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  ;

Backbone.$ = $;

var Models = {
    Post: require("../models/Post")
  }
  ;

/**
 * Collections.PostList
 * 
 */
module.exports = Backbone.Collection.extend({

  url: "/api/posts",
  model: Models.Post

});