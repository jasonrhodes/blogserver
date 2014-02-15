/* global vent: true */

var $ = require("jquery")
  , Backbone = require("backbone")
  , _ = require("underscore")

vent = _.extend({}, Backbone.Events);

var AppRouter = require("./app/Router")
  , Views = {
        PostForm: require("./app/views/PostForm")
      , TalkForm: require("./app/views/TalkForm")
    }

$(document).ready(function () {

  var router = new AppRouter();
  var matched = Backbone.history.start({
    pushState: true,
    root: "/admin/"
  });

  if (!matched) { console.log("No route matches"); }

  vent.on("post:edit", function (post) {
    router.navigate("posts/" + post.get("_id") + "/edit", { trigger: true }); 
  });
  
  vent.on("post:add", function (collection) { 
    new Views.PostForm();
    router.navigate("posts/new"); 
  });

  vent.on("talk:edit", function (talk) {
    router.navigate("talks/" + talk.get("_id") + "/edit", { trigger: true }); 
  });
  
  vent.on("talk:add", function (collection) { 
    new Views.TalkForm();
    router.navigate("talks/new"); 
  });

  vent.on("entry:save", function (entry) {
    entry.save({}).done(function () {
      router.navigate("/", { trigger: true });
    });
  });

  vent.on("entry:cancel", function () {
    router.navigate("/", { trigger: true });
  })

});
