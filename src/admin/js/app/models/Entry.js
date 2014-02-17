/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  , slug = require("slug")
  
Backbone.$ = $;

/**
 * Models.Entry
 *
 * Extendable base model
 * 
 */
module.exports = Backbone.Model.extend({

  initialize: function () {

  },

  validate: function () {

    if (!this.get("publishDate")) {
      this.set("publishDate", new Date());
    }

    if (!this.get("slug")) {
      this.set("slug", slug(this.get("title")));
    }

  },

  parse: function (result) {

    return _.extend({}, { id: result._id }, result);

  }

});