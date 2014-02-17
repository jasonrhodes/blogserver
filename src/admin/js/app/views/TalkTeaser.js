/* global module: false */
/* global require: false */
/* global vent: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  ;

Backbone.$ = $;

var templates = { talkTeaser: require("../templates/talk-teaser.html") }
  , Views = {
      EntryTeaser: require("./EntryTeaser")
  }


/**
 * Views.TalkTeaser
 * 
 */
module.exports = Views.EntryTeaser.extend({

  className: "talk-teaser entry-teaser",

  template: templates.talkTeaser,

  edit: function (e) {
    e.preventDefault();
    vent.trigger("talk:edit", this.model);
  }

});