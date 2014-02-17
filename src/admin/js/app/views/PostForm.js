/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")

Backbone.$ = $;

var Views = {
    EntryForm: require("./EntryForm"),
  }
  , Models = {
    Post: require("../models/Post")
  }
  templates = { postForm: require("../templates/post-form.html") }

/**
 * Views.PostForm
 * 
 */
module.exports = Views.EntryForm.extend({

  className: "post-form entry-form",

  initialize: function () {

    // When creating a new post, we create the new model here
    if (!this.model) {
      this.model = new Models.Post();
    }

    this.render();

  },

  template: templates.postForm

});