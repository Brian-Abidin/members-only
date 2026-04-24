function get404(req, res, next) {
  res.status(404).render("failure");
}

module.exports = {
  get404
};
