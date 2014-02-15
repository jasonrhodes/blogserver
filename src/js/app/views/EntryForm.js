/* global module: false */
/* global require: false */

var Backbone = require("backbone")
  , _ = require("underscore")
  , $ = require("jquery")


Backbone.$ = $;


/**
 * Views.EntryForm
 * 
 */
module.exports = Backbone.View.extend({

  tagName: "div",

  initialize: {

  },

  events: {
    "click [type='submit']": "save",
    "click [type='cancel']": "cancel"
  },

  save: function (e) {
    e.preventDefault();

    // Loop through form fields and set them to the post object
    _.each(this.$("form").serializeArray(), function (field, i) {

      this.model.set(field.name, field.value);
    
    }, this);

    // If creating a new entry, add to posts collection
    if (this.model.isNew()) {

      this.collection.add(this.model);
    
    }

    // Trigger the entry:save event
    vent.trigger("entry:save", this.model);

    // Make sure to remove the view and its event listeners
    this.remove();
  },

  cancel: function (e) {
    e.preventDefault();
    vent.trigger("entry:cancel");
  },

  render: function () {
    
    this.$el.html(this.template({ entry: this.model.toJSON() }));   
    $("#pageContainer").html(this.el);

    return this;
    
  }

});