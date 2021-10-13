const isAuthenticated = (req, res, next) => (req.user ? next() : next(new Error('No autorizado')))

module.exports = {
  isAuthenticated
}
