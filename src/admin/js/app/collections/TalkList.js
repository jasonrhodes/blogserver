/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  
Backbone.$ = $;

var Models = {
    Talk: require("../models/Talk")
  }
  
/**
 * Collections.TalkList
 * 
 */
module.exports = Backbone.Collection.extend({

  url: "/api/talks",
  model: Models.Talk

});