/* global module: false */
/* global require: false */
/* global vent: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")
  ;

Backbone.$ = $;


/**
 * Views.EntryTeaser
 * 
 */
module.exports = Backbone.View.extend({

  tagName: "div",

  events: {
    "click .delete": "remove",
    "click .edit": "edit"
  },

  remove: function (e) {

    var view = this;

    this.model.destroy().done(function () {

      view.$el.fadeOut(500, function () { view.remove(); });

    });

  },

  render: function () {

    this.$el.append(this.template(this.model.toJSON()));

    return this;

  }

});