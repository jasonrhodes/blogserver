/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  
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

  },

  parse: function (result) {

    return _.extend({}, { id: result._id }, result);

  }

});