/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")

Backbone.$ = $;

var Collections = {
      PostList: require("../collections/PostList")
    , TalkList: require("../collections/TalkList")
  }
  , Views = {
      PostList: require("./PostList")
    , TalkList: require("./TalkList")
  }

/**
 * Views.Home (Master)
 * 
 */
module.exports = Backbone.View.extend({

  tagName: "div",

  initialize: function () {
    
    this.collections = {};
    this.views = {};

    this.collections.posts = new Collections.PostList()
    this.collections.talks = new Collections.TalkList()

    this.views.postList = new Views.PostList({ collection: this.collections.posts })
    this.views.talkList = new Views.TalkList({ collection: this.collections.talks })

    this.render();

  },

  render: function () {

    var self = this;
    this.$el.html("");

    self.$el.append($("<h1>").text("Dashboard"));

    $.when(self.collections.posts.fetch(), self.collections.talks.fetch()).done(function () {

      self.$el.append(self.views.postList.render().el);
      self.$el.append(self.views.talkList.render().el);
      $("#pageContainer").html(self.el);

    });

    return this;
  }

});