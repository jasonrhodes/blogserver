/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  ;

Backbone.$ = $;

var Views = {
    PostTeaser: require("./PostTeaser")
  }

/**
 * Views.EntryList
 * 
 */
module.exports = Backbone.View.extend({

  tagName: "div",

  initialize: function () {

  },

  events: {
    "click .add": "create"
  },

  create: function (e) {
    e.preventDefault();
    vent.trigger("entry:add", this.collection);
  },

  render: function () {

    this.$el.html("");
    this.$el.append($("<button>").addClass("add").text("Add Post"));

    this.collection.each(function (item, i) {

      var teaser = new Views.PostTeaser({ model: item });
      this.$el.append(teaser.render().el);

    }, this);

    return this;
  }

});