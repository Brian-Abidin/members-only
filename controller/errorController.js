function get404(req, res) {
  res.status(404).render("failure");
}

module.exports = {
  get404
};
