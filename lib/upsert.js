var db = require("../data/load")

module.exports = function (object, db, callback) {

  // if (!post._id && !post.publishDate) {
  //   post.publishDate = new Date();
  // }
  
  db.update({ _id: object.id || object._id }, object, { upsert: true }, callback);

}