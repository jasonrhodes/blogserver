module.exports = {

  index: function (req, res) {

    res.render("index.html", { 
      pageTitle: "Blogamatic Dashboard",
      stylesheets: ["/admin/assets/style.css"],
      scripts: ["/admin/assets/main.js"],
      containerId: "pageContainer",
      containerClasses: ["container"]
    });
  
  }

}