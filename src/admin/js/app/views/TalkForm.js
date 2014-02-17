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
    Talk: require("../models/Talk")
  }
  templates = { talkForm: require("../templates/talk-form.html") }

/**
 * Views.TalkForm
 * 
 */
module.exports = Views.EntryForm.extend({

  className: "talk-form entry-form",

  initialize: function () {

    // When creating a new post, we create the new model here
    if (!this.model) {
      this.model = new Models.Talk();
    }

    this.render();

  },

  template: templates.talkForm

});