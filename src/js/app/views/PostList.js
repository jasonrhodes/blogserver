/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  ;

Backbone.$ = $;

var Views = {
      EntryList: require("./EntryList")
    , PostTeaser: require("./PostTeaser")
  }

/**
 * Views.PostList
 * 
 */
module.exports = Views.EntryList.extend({

  className: "post-list entry-list",

  create: function (e) {
    e.preventDefault();
    vent.trigger("post:add");
  },

  render: function () {

    this.$el.html("");
    this.$el.append($("<button>").addClass("add").text("Add Post"));

    this.collection.each(function (post, i) {

      var teaser = new Views.PostTeaser({ model: post });
      this.$el.append(teaser.render().el);

    }, this);

    return this;
  }

});