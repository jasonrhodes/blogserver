/* global module: false */
/* global require: false */
/* global vent: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  ;

Backbone.$ = $;

var templates = { postTeaser: require("../templates/post-teaser.html") }
  , Views = {
      EntryTeaser: require("./EntryTeaser")
  }


/**
 * Views.PostTeaser
 * 
 */
module.exports = Views.EntryTeaser.extend({

  className: "post-teaser entry-teaser",

  template: templates.postTeaser,

  edit: function (e) {
    e.preventDefault();
    vent.trigger("post:edit", this.model);
  }

});