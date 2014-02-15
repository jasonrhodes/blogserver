/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  ;

Backbone.$ = $;

var Views = {
      EntryList: require("./EntryList")
    , TalkTeaser: require("./TalkTeaser")
  }

/**
 * Views.TalkList
 * 
 */
module.exports = Views.EntryList.extend({

  className: "talk-list entry-list",

  create: function (e) {
    e.preventDefault();
    vent.trigger("talk:add");
  },

  render: function () {

    this.$el.html("");
    this.$el.append($("<button>").addClass("add").text("Add Talk"));

    this.collection.each(function (talk, i) {

      var teaser = new Views.TalkTeaser({ model: talk });
      this.$el.append(teaser.render().el);

    }, this);

    return this;
  }

});