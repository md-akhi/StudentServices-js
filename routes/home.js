module.exports = function(app, ssen) {

app.get("/", function (req, res) {
  res.render("home", { name: "student Services", title: "Student Services" });
});

};
