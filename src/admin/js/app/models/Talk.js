/* global module: false */
/* global require: false */

// var Backbone = require("backbone")
//   , _ = require("underscore")
//   , $ = require("jquery")
var moment = require("moment")
  , path = require("path")
  
// Backbone.$ = $;

var Models = {
    Entry: require("./Entry")
  }

/**
 * Models.Talk
 * 
 */
module.exports = Models.Entry.extend({

  validate: function () {

    Models.Entry.prototype.validate.apply(this);

    var date = moment(this.get("publishDate"));
    var slug = this.get("slug");

    var year = date.format("YYYY");
    var month = date.format("MM");

    this.set("permalink", "/talks/" + path.join(year, month, slug + ".html"));
    
  }

});